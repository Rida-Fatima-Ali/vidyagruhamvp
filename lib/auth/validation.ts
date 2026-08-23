/**
 * Central Institutional Domain Validation (Single Source of Truth)
 * Enforces ALLOWED_EMAIL_DOMAIN (defaults to somaiya.edu)
 */

export function getAllowedEmailDomain(): string {
  return process.env.ALLOWED_EMAIL_DOMAIN || "somaiya.edu";
}

/**
 * Validates whether an email ends with the allowed institutional domain.
 * @param email - The email string to validate
 * @returns boolean - true if allowed, false otherwise
 */
export function isAllowedInstitutionEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const cleanEmail = email.trim().toLowerCase();
  const allowedDomain = getAllowedEmailDomain().toLowerCase().replace(/^@/, "");
  
  // Must contain an @ and end with @allowedDomain
  const parts = cleanEmail.split("@");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return false;
  
  return parts[1] === allowedDomain;
}

/**
 * Validates institutional credentials or admin internal identifier
 */
export function validateLoginIdentifier(
  identifier: string,
  role?: string
): { isValid: boolean; error?: string } {
  const clean = identifier.trim().toLowerCase();
  
  // Admin account internal identifier exception
  if (clean === "admin01" || role === "admin") {
    return { isValid: true };
  }

  if (!isAllowedInstitutionEmail(clean)) {
    const domain = getAllowedEmailDomain();
    return {
      isValid: false,
      error: `Institutional access restricted. Email must end with @${domain}`,
    };
  }

  return { isValid: true };
}
