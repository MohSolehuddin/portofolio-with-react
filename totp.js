const otplib = require("otplib");
const { setInterval } = require("timers/promises");
const totp = otplib.authenticator;

// Set waktu langkah (step time) menjadi 30 detik
totp.options = { step: 30 };

// Secret key yang bisa digenerate secara acak atau dari QR code
const secret = "JBSWY3DPEHPK3PXP"; // Bisa digenerate secara acak

// Generate TOTP untuk waktu saat ini
async function generate() {
  const token = totp.generate(secret);
  console.log("Generated TOTP:", token);
  // Verifikasi TOTP
  const isValid = totp.check(token, secret);
  console.log("Is TOTP valid?", isValid);
}

async function wait() {
  // Menghasilkan dan memverifikasi token TOTP setiap 30 detik
  for await (const _ of setInterval(300)) {
    // 30000 ms = 30 detik
    await generate();
  }
}
wait();
