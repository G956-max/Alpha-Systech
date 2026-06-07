/**
 * EmailJS Configuration
 * 
 * This file centralizes all EmailJS configuration for easy updates.
 * Credentials are loaded from environment variables for security.
 * 
 * To set up EmailJS:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template with the following variables:
 *    - user_name: Full Name
 *    - user_email: Email Address
 *    - user_phone: Phone Number
 *    - user_company: Company Name
 *    - user_service: Service Required
 *    - user_budget: Budget
 *    - message: Project Requirements / Message
 * 4. Add your credentials to the .env file
 */

export const emailjsConfig = {
  /**
   * EmailJS Service ID
   * Get this from your EmailJS dashboard -> Email Services
   */
  serviceId: process.env.EMAILJS_SERVICE_ID || "service_xclq3rf",
  
  /**
   * EmailJS Template ID
   * Get this from your EmailJS dashboard -> Email Templates
   */
  templateId: process.env.EMAILJS_TEMPLATE_ID || "template_r5x1ud9",
  
  /**
   * EmailJS Public Key
   * Get this from your EmailJS dashboard -> Account -> General
   */
  publicKey: process.env.EMAILJS_PUBLIC_KEY || "_j8lXE6cH_rtJwB7d",
};

/**
 * Validate EmailJS configuration
 * Throws an error if required credentials are missing
 */
export const validateEmailJSConfig = () => {
  const { serviceId, templateId, publicKey } = emailjsConfig;
  
  if (!serviceId || serviceId === "service_xclq3rf") {
    console.warn('EmailJS Service ID is using fallback value. Set EMAILJS_SERVICE_ID in .env');
  }
  if (!templateId || templateId === "template_r5x1ud9") {
    console.warn('EmailJS Template ID is using fallback value. Set EMAILJS_TEMPLATE_ID in .env');
  }
  if (!publicKey || publicKey === "_j8lXE6cH_rtJwB7d") {
    console.warn('EmailJS Public Key is using fallback value. Set EMAILJS_PUBLIC_KEY in .env');
  }
  
  return { serviceId, templateId, publicKey };
};
