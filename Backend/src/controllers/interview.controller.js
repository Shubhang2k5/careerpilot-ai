const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
  try {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    const { selfDescription, jobDescription } = req.body;

    let resumeContent = "";

    // Parse resume only if uploaded
    if (req.file) {
      const resumeData = await pdfParse(req.file.buffer);
      resumeContent = resumeData.text;
    }

    // At least one input must exist
    if (!resumeContent && !selfDescription) {
      return res.status(400).json({
        message: "Please provide either a resume or a self description.",
      });
    }

    const interViewReportByAi = await generateInterviewReport({
      resume: resumeContent,
      selfDescription,
      jobDescription,
    });

    console.log("AI RESPONSE:");
    console.log(JSON.stringify(interViewReportByAi, null, 2));

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,

      title: interViewReportByAi.title || "Interview Report",

      jobDescription,

      resume: resumeContent,

      selfDescription,

      matchScore: interViewReportByAi.matchScore,

      technicalQuestions: interViewReportByAi.technicalQuestions || [],

      behavioralQuestions: interViewReportByAi.behavioralQuestions || [],

      skillGaps: interViewReportByAi.skillGaps || [],

      preparationPlan: interViewReportByAi.preparationPlan || [],
    });

    res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to generate interview report.",
      error: err.message,
    });
  }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {
  const { interviewId } = req.params;

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found.",
    });
  }

  res.status(200).json({
    message: "Interview report fetched successfully.",
    interviewReport,
  });
}

/**
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

  res.status(200).json({
    message: "Interview reports fetched successfully.",
    interviewReports,
  });
}

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
  const { interviewReportId } = req.params;

  const interviewReport =
    await interviewReportModel.findById(interviewReportId);

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found.",
    });
  }

  const { resume, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({
    resume,
    jobDescription,
    selfDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
  });

  res.send(pdfBuffer);
}

module.exports = {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
};
