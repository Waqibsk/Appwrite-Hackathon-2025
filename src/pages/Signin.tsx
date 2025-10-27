import React, { useState } from "react";
import { account, ID_, tabelsDB } from "@/lib/appwrite";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Role, Permission, Query } from "appwrite";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useNavigate } from "react-router";
import { DB_ID, USER_COLLECTIONS_ID } from "@/lib/appwrite";
import { motion } from "framer-motion";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<React.ReactNode>(null);
  const navigate = useNavigate();
  async function sendOtp() {
    setLoading(true);
    try {
      const newUserId = ID_.unique();
      const sessionToken = await account.createEmailToken({
        userId: newUserId,
        email,
      });
      setStep("otp");
      setUserId(sessionToken.userId);
      setMessage("OTP sent! Check your email.");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    if (!userId) return;
    setLoading(true);
    try {
      console.log(otp);
      const session = await account.createSession({
        userId: userId,
        secret: otp,
      });

      setMessage(
        <span className="flex items-center gap-2 text-green-600">
          <Check size={18} /> Signed in successfully!
        </span>
      );
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex justify-center min-h-screen items-center"
    >
      <div className="p-10 w-[30%] shadow-md rounded-xl border bg-white ">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>

        {step === "email" && (
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button disabled={loading || !email} onClick={sendOtp}>
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-600 text-sm">
              Enter the 6-digit OTP sent to <b>{email}</b>
            </p>

            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={otp}
              onChange={(value) => setOtp(value)}
              className="text-black"
            >
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <Button disabled={loading || otp.length < 6} onClick={verifyOtp}>
              {loading ? "Verifying..." : "Verify & Sign In"}
            </Button>

            <button
              className="text-sm text-blue-600 mt-2"
              onClick={() => setStep("email")}
            >
              ← Change Email
            </button>
          </div>
        )}

        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </motion.div>
  );
}
