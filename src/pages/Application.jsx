import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";

const Application = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // Prevents UI flicker
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    passion: "",
    scholarship_type: "partial",
    scholarship_reason: "",
  });

  // --- THE SMART CHECKER ---
  useEffect(() => {
    const checkExistingApplication = async () => {
      if (!user) return;

      // 🔥 FOOLPROOF REFERRAL PROCESSING 🔥
      // Check if they brought a referral code with them
      const refId = localStorage.getItem("magic_invite_ref");
      if (refId) {
        try {
          // Tell the secure database function to process the points
          await supabase.rpc("process_invite", { referrer_id: refId });
        } catch (err) {
          console.error("Invalid referral code ignored.");
        }
        // Destroy the code so it never fires again!
        localStorage.removeItem("magic_invite_ref");
      }

      // 1. Check if the user is an ADMIN first!
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (profile?.is_admin) {
        navigate("/dashboard/admin");
        return;
      }

      // 2. If not an admin, check their application status
      const { data: app } = await supabase
        .from("applications")
        .select("status")
        .eq("user_id", user.id)
        .maybeSingle();

      if (app) {
        if (app.status === "approved") {
          navigate("/dashboard");
        } else {
          setStep(4);
        }
      }
      setIsChecking(false);
    };

    checkExistingApplication();
  }, [user, navigate]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

const [copied, setCopied] = useState(false);
  
  // Safely generate the invite link using their ID
  const inviteLink = user ? `${window.location.origin}/signup?ref=${user.id}` : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("applications").insert({
        user_id: user.id,
        age: parseInt(formData.age),
        gender: formData.gender,
        passion: formData.passion,
        scholarship_type: formData.scholarship_type,
        scholarship_reason: formData.scholarship_reason,
      });

      if (error) throw error;

      setStep(4); // Move to waiting room
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show a blank/loading screen while we check their database status
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="w-10 h-10 border-4 border-[#FFD700]/20 border-t-[#FFD700] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-4 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f19d00]/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="w-full max-w-2xl bg-[#1a1a1a]/80 backdrop-blur-md border border-[#FFD700]/15 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
        {/* Progress Bar */}
        {step < 4 && (
          <div className="w-full h-2 bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#f19d00] to-[#D4AF37] transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        )}

        <div className="p-8 md:p-12">
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-2">
                Welcome to Cohort 1 👋
              </h2>
              <p className="text-zinc-400 mb-8">
                Let's get to know the artist behind the screen.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 24"
                    className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#FFD700] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#FFD700] transition-colors appearance-none text-white cursor-pointer"
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: The Passion */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-2">
                Your Creative Spark ✨
              </h2>
              <p className="text-zinc-400 mb-8">
                What drives you to be part of this historic project?
              </p>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
                  What is your core passion?
                </label>
                <textarea
                  name="passion"
                  value={formData.passion}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us what makes you come alive..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#FFD700] transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Scholarship */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-2">
                Scholarship Details 🎓
              </h2>
              <p className="text-zinc-400 mb-8">
                We are committed to empowering raw talent.
              </p>

              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() =>
                      setFormData({ ...formData, scholarship_type: "partial" })
                    }
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.scholarship_type === "partial" ? "border-[#FFD700] bg-[#FFD700]/10 shadow-[0_0_15px_rgba(255,215,0,0.1)]" : "border-white/10 hover:border-white/30 bg-black/20"}`}
                  >
                    <h3 className="font-bold text-[#FFD700] mb-1">
                      Partial Scholarship
                    </h3>
                    <p className="text-xs text-zinc-400">
                      I can cover some costs, but need a boost.
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      setFormData({ ...formData, scholarship_type: "full" })
                    }
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.scholarship_type === "full" ? "border-[#FFD700] bg-[#FFD700]/10 shadow-[0_0_15px_rgba(255,215,0,0.1)]" : "border-white/10 hover:border-white/30 bg-black/20"}`}
                  >
                    <h3 className="font-bold text-[#FFD700] mb-1">
                      Full Scholarship
                    </h3>
                    <p className="text-xs text-zinc-400">
                      I require complete financial assistance.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
                    Why should we choose you?
                  </label>
                  <textarea
                    name="scholarship_reason"
                    value={formData.scholarship_reason}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Make your case..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#FFD700] transition-colors resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success / The Waiting Room */}
          {/* STEP 4: Success / The Waiting Room */}
          {step === 4 && (
            <div className="text-center animate-fade-in py-10">
              <div className="w-20 h-20 bg-[#FFD700]/10 text-[#FFD700] rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border border-[#FFD700]/30 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                ⏳
              </div>
              <h2 className="text-3xl font-bold mb-3">Application Under Review</h2>
              <p className="text-zinc-400 max-w-sm mx-auto mb-8 leading-relaxed">
                Thank you for applying to Cohort 1! Our team is currently reviewing your application.
              </p>

              {/* 🔥 THE VIRAL BOOST CARD 🔥 */}
              <div className="max-w-md mx-auto bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-2xl p-6 mb-8 text-left shadow-[0_0_20px_rgba(255,215,0,0.05)] relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFD700]/10 blur-3xl rounded-full pointer-events-none"></div>
                
                <h3 className="text-[#FFD700] font-black text-lg mb-2 flex items-center gap-2">
                  <span>🚀</span> Boost Your Chances!
                </h3>
                <p className="text-sm text-zinc-300 mb-5 leading-relaxed">
                  Want to stand out from the thousands of applicants? Invite other talented creatives to the movement. Every friend who applies using your link significantly boosts your priority in the review queue.
                </p>
                
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={inviteLink}
                    className="bg-black/60 border border-[#FFD700]/30 rounded-xl px-4 py-3 text-sm text-zinc-300 w-full focus:outline-none focus:border-[#FFD700] transition-colors"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className={`px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                      copied 
                      ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                      : 'bg-gradient-to-r from-[#f19d00] to-[#D4AF37] text-black hover:-translate-y-0.5 shadow-[0_0_15px_rgba(255,215,0,0.2)]'
                    }`}
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>

              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate('/');
                }}
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all"
              >
                Sign Out for Now
              </button>
            </div>
          )}
          
          {/* Form Navigation Buttons */}
          {step < 4 && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/10">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`px-6 py-2 font-bold transition-colors ${step === 1 ? "text-zinc-700 cursor-not-allowed opacity-50" : "text-zinc-400 hover:text-white"}`}
              >
                Back
              </button>

              {step < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={(!formData.age || !formData.gender) && step === 1}
                  className="px-8 py-3 bg-gradient-to-r from-[#f19d00] to-[#D4AF37] text-black font-extrabold rounded-xl hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(241,157,0,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.scholarship_reason}
                  className="px-8 py-3 bg-gradient-to-r from-[#f19d00] to-[#D4AF37] text-black font-extrabold rounded-xl hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(241,157,0,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Application;
