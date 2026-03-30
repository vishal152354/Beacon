import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://dphcngdxxwnnkdkpyyum.supabase.co"
const supabaseKey = "sb_secret_vn24BSICItM02vv1Q2JSEQ_rVJ6mfUS"
const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
    console.log("Checking buckets...")
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()

    if (bucketError) {
        console.log("Error listing buckets:", bucketError.message)
        return
    }

    const resumesBucket = buckets?.find(b => b.name === "resumes")
    if (!resumesBucket) {
        console.log("❌ The 'resumes' bucket does not exist! Please create it in your Supabase dashboard.")
    } else {
        console.log("✅ The 'resumes' bucket exists. Checking for files in the 'candidates' folder...")
        const { data: files, error: filesError } = await supabase.storage.from("resumes").list("candidates", { limit: 10 })

        if (filesError) {
            console.log("Error listing files:", filesError.message)
        } else if (files && files.length > 0) {
            console.log("✅ Found files in the bucket:", files.map(f => f.name))
        } else {
            console.log("❌ The bucket exists, but there are no files in the 'candidates' folder.")
            console.log("   Are you sure you uploaded a real file using the 'Browse Files' button? The 'Upload Demo Files' button only simulates an upload.")
        }
    }
}

test()
