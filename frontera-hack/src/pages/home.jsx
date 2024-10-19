import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pqwzdtwzvxlpwcudgmyq.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxd3pkdHd6dnhscHdjdWRnbXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2NDM0NzEsImV4cCI6MjA0MTIxOTQ3MX0.nm3mj88sREyAkAJ8VKhopYKjitw4zIiPeObrJ_aFdkY";
const supabase = createClient(supabaseUrl, anonKey);

function App() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("companies").select();
    setCompanies(data);
  }

  return (
    <ul>
      {companies.map((company) => (
        <li key={company.company_id}>{company.name}</li>
      ))}
    </ul>
  );
}

export default App;