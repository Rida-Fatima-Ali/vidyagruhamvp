-- =============================================================================
-- VIDYAGRUHA MVP — Supabase PostgreSQL Schema & Migrations
-- =============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Departments Table
create table if not exists public.departments (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  code text not null unique,
  created_at timestamptz default now()
);

-- 2. Profiles Table (Extends Supabase Auth users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  role text not null check (role in ('student', 'faculty', 'admin')),
  department_id uuid references public.departments(id) on delete set null,
  created_at timestamptz default now()
);

-- 3. Students Table
create table if not exists public.students (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  enrollment_no text not null unique,
  semester integer not null default 3,
  division text not null default 'A',
  department_id uuid references public.departments(id) on delete set null,
  created_at timestamptz default now()
);

-- 4. Faculty Table
create table if not exists public.faculty (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  employee_id text not null unique,
  department_id uuid references public.departments(id) on delete set null,
  created_at timestamptz default now()
);

-- 5. Subjects Table
create table if not exists public.subjects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  code text not null unique,
  semester integer not null default 3,
  department_id uuid references public.departments(id) on delete cascade,
  faculty_id uuid references public.faculty(id) on delete set null,
  created_at timestamptz default now()
);

-- 6. Timetable Table
create table if not exists public.timetable (
  id uuid primary key default uuid_generate_v4(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  faculty_id uuid not null references public.faculty(id) on delete cascade,
  day text not null check (day in ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
  start_time text not null,
  end_time text not null,
  room text not null,
  division text not null default 'A',
  created_at timestamptz default now()
);

-- 7. Attendance Table (with unique constraint to prevent duplicate attendance)
create table if not exists public.attendance (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.students(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  faculty_id uuid not null references public.faculty(id) on delete cascade,
  date date not null default current_date,
  status text not null check (status in ('present', 'absent', 'late')),
  created_at timestamptz default now(),
  constraint unique_student_subject_date unique (student_id, subject_id, date)
);

-- 8. Notices Table
create table if not exists public.notices (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text not null,
  priority text not null check (priority in ('low', 'normal', 'high', 'urgent')) default 'normal',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

-- 9. Cover Requests Table (Faculty Cover Marketplace)
create table if not exists public.cover_requests (
  id uuid primary key default uuid_generate_v4(),
  faculty_id uuid not null references public.faculty(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  date date not null,
  start_time text not null,
  end_time text not null,
  room text not null,
  reason text not null,
  status text not null check (status in ('open', 'accepted', 'cancelled')) default 'open',
  accepted_by uuid references public.faculty(id) on delete set null,
  created_at timestamptz default now()
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

alter table public.departments enable row level security;
alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.faculty enable row level security;
alter table public.subjects enable row level security;
alter table public.timetable enable row level security;
alter table public.attendance enable row level security;
alter table public.notices enable row level security;
alter table public.cover_requests enable row level security;

-- Profiles: Anyone authenticated can read profiles; users can update own profile
create policy "Authenticated can read profiles" on public.profiles
  for select to authenticated using (true);
create policy "Users can update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- Departments & Subjects & Timetable: Authenticated users can read
create policy "Authenticated can read departments" on public.departments for select to authenticated using (true);
create policy "Authenticated can read subjects" on public.subjects for select to authenticated using (true);
create policy "Authenticated can read timetable" on public.timetable for select to authenticated using (true);

-- Students: Authenticated can read student info
create policy "Authenticated can read students" on public.students for select to authenticated using (true);

-- Faculty: Authenticated can read faculty info
create policy "Authenticated can read faculty" on public.faculty for select to authenticated using (true);

-- Attendance:
-- Students can read their own attendance
create policy "Students can view own attendance" on public.attendance
  for select to authenticated using (
    exists (select 1 from public.students where students.id = attendance.student_id and students.profile_id = auth.uid())
    or exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role in ('faculty', 'admin'))
  );

-- Faculty & Admin can insert and update attendance
create policy "Faculty and Admin can mark attendance" on public.attendance
  for all to authenticated using (
    exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role in ('faculty', 'admin'))
  );

-- Notices: Authenticated can read notices, Admin can insert/update
create policy "Authenticated can view notices" on public.notices for select to authenticated using (true);
create policy "Admin can manage notices" on public.notices for all to authenticated using (
  exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin')
);

-- Cover Requests: Faculty can view all, insert their own, update (accept)
create policy "Faculty and Admin can view cover requests" on public.cover_requests for select to authenticated using (true);
create policy "Faculty can create cover requests" on public.cover_requests for insert to authenticated with check (
  exists (select 1 from public.faculty where faculty.id = cover_requests.faculty_id and faculty.profile_id = auth.uid())
  or exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin')
);
create policy "Faculty can accept cover requests" on public.cover_requests for update to authenticated using (
  exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role in ('faculty', 'admin'))
);

-- =============================================================================
-- SEED DATA (Departments, Subjects, Demo Students & Faculty)
-- =============================================================================

-- Departments
insert into public.departments (id, name, code) values
  ('d1000000-0000-0000-0000-000000000001', 'Computer Engineering', 'CMPN'),
  ('d1000000-0000-0000-0000-000000000002', 'Information Technology', 'IT'),
  ('d1000000-0000-0000-0000-000000000003', 'Electronics & Telecommunication', 'EXTC')
on conflict (code) do nothing;
