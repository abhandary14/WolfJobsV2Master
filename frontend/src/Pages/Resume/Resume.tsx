/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import ResumeDropzone from "../../components/Resume/ResumeDropzone";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-hot-toast";

const Resume: React.FC = () => {
  // State to store the uploaded file
  const [file, setFile] = useState<File | null>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // The current resume data
  const resumeName = useUserStore((state) => state.resume);
  const userId = useUserStore((state) => state.id);
  const updateResume = useUserStore((state) => state.updateResume);
  const updateResumeId = useUserStore((state) => state.updateResumeId);

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("id", userId);

      try {
        const response = await axios.post(
          "http://localhost:8000/users/uploadresume",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          console.log("Resume uploaded successfully");
          toast.success(
            "Resume Uploaded Successfully. Sign out and sign back in to see changes!"
          );
        }
      } catch (error) {
        console.error("Error uploading the resume", error);
        toast.error("Resume could not be uploaded");
      }
    }
  };

  const handleATSChecker = async () => {
    setIsLoading(true);
    try {
      console.log(userId);
      const response = await axios.post(
        "http://localhost:8000/resume/parseResume",
        { userId: userId }
      );
      console.log(response.data);

      if (response.data.success) {
        setAtsScore(response.data.ats_score);
        toast.success("PDF parsed successfully!!!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Parsing PDF");
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 300) return "text-green-600";
    if (score >= 200) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-1/3">
          <ResumeDropzone
            onFileUpload={(acceptedFiles) => setFile(acceptedFiles[0])}
          />
          <div className="flex flex-row">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded"
            >
              Upload Resume
            </button>
          </div>

          {resumeName && (
            <>
              <div className="mt-4">
                <p>Current Resume: {resumeName}</p>
                <div className="flex space-x-4">
                  <a
                    href={`/resumeviewer/${userId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 font-bold text-white bg-red-500 rounded"
                  >
                    View
                  </a>
                  <button
                    onClick={handleATSChecker}
                    disabled={isLoading}
                    className="inline-block px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                  >
                    {isLoading ? "Checking..." : "Check ATS Score"}
                  </button>
                </div>
              </div>
            </>
          )}
          {atsScore !== null && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">ATS Score</h3>
              <div className="flex items-center">
                <span
                  className={`text-4xl font-bold ${getScoreColor(atsScore)}`}
                >
                  {atsScore}
                </span>
                <span className="text-2xl font-medium ml-2">/400</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className={`h-2.5 rounded-full ${getScoreColor(atsScore)}`}
                  style={{ width: `${(atsScore / 400) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Resume;
