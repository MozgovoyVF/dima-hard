import crypto from "crypto";
import { CONSUMER_SECRET } from "../constants/global.constants";

export const cryptoService = {
  algorithm: "aes-192-cbc",
  key: crypto.scryptSync(CONSUMER_SECRET, "salt", 24),

  encrypt(text: string) {
    // Генерируем случайный IV для каждого шифрования
    const iv = crypto.randomBytes(16);

    // Создаем объект шифрования с динамическим IV
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    // Шифруем данные
    const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");

    // Возвращаем зашифрованные данные вместе с IV в виде строки
    return iv.toString("hex") + ":" + encrypted;
  },

  decrypt(encryptedText: string) {
    // Разделяем IV и зашифрованные данные
    const [ivHex, encrypted] = encryptedText.split(":");

    // Восстанавливаем IV из строки
    const iv = Buffer.from(ivHex, "hex");

    // Создаем объект расшифровки с тем же IV
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);

    // Расшифровываем данные
    const decrypted = decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");

    return decrypted;
  },
};
