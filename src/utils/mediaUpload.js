import { createClient } from "@supabase/supabase-js";

const url = "https://vlbcoqjcylqnnxrbjjsj.supabase.co";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsYmNvcWpjeWxxbm54cmJqanNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNTMyNTAsImV4cCI6MjA3NzkyOTI1MH0.P4s7Pkh-AJAY_7ccGvYYZbnocK8SiT8YkWHiByk1Voo";

const superbase = createClient(url, key);

export default function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const timeStamp = Date.now();
    const fileName = timeStamp + "_" + file.name;

    superbase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicurl =
          superbase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
        resolve(publicurl);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
