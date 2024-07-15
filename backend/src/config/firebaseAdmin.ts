import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";

const serviceAccount: ServiceAccount = {
  type: "service_account",
  project_id: Bun.env.PROJECT_ID,
  private_key_id: Bun.env.PRIVATE_KEY_ID,
  private_key: JSON.parse(`"${Bun.env.PRIVATE_KEY}"`),
  client_email:Bun.env.CLIENT_EMAIL,
  client_id: Bun.env.CLIENT_ID,
  auth_url: Bun.env.AUTH_URL,
  token_url: Bun.env.TOKEN_URL,
  auth_provider_x509_cert_url: Bun.env.AUTH_PROVIDER__X509_CERT_URL,
  client_x509_cert_url: Bun.env.CLIENT_x509_CERT_URL,
} as unknown as ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const messaging = admin.messaging();
export const auth = admin.auth()
export { admin };

