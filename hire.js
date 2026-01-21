import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔴 REPLACE THESE
const SUPABASE_URL = "https://ubvetriarbirpsxtqyrv.supabase.co";
const SUPABASE_KEY = "sb_publishable_3fjnq3old428IExY9kmdOA_UVYeaRHu";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("hireForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.innerText = "Submitting...";

    const { error } = await supabase.from("hire_requests").insert([{
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        company: document.getElementById("company").value,
        message: document.getElementById("message").value
    }]);

    if (error) {
        console.error(error);
        status.innerText = "❌ Submission failed";
    } else {
        status.innerText = "✅ Thank you! I will contact you soon.";
        form.reset();
    }
});