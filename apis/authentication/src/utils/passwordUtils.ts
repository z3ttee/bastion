import { promisify } from "node:util";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";

interface HashedPassword {
  hash: string;
  salt: string;
}

/** Hash a password and get the hashed result and the generated salt */
export async function hashPassword(password: string, saltLength: number = 32): Promise<HashedPassword> {
  const salt = randomBytes(saltLength).toString("hex");
  const buf = (await promisify(scrypt)(password, salt, 64)) as Buffer;

  return {
    hash: `${buf.toString("hex")}.${salt}`,
    salt: salt
  };
}

/** Verify password */
export async function verifyPassword(password: string, storedPassword: string): Promise<boolean> {
  const [hashedPassword, salt] = storedPassword.split(".");
  const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");

  const suppliedPasswordBuf = (await promisify(scrypt)(password, salt, 64)) as Buffer;
  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}
