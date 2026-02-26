export const generateStudentPdf = async (student: any) => {
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Add Header
  doc.setFontSize(22);
  doc.setTextColor(30, 64, 175); // Blue 800
  doc.text("Student Application Form", 105, 25, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // Slate 500
  doc.text("Official Submission Document", 105, 32, { align: "center" });

  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.setLineWidth(0.5);
  doc.line(20, 40, 190, 40);

  let yPos = 50;

  // Helper function to draw sections manually
  const addSection = (title: string, data: Record<string, any>) => {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.text(title, 20, yPos);
    yPos += 8;

    doc.setFont("helvetica", "normal");

    Object.entries(data).forEach(([key, value]) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139); // Slate 500
      doc.text(key + ":", 25, yPos);

      doc.setTextColor(15, 23, 42); // Slate 900

      const displayValue = value === undefined || value === null || value === "" ? "—" : value.toString();
      const splitText = doc.splitTextToSize(displayValue, 110);
      doc.text(splitText, 70, yPos);

      yPos += 6 * splitText.length;
    });

    yPos += 4;
    doc.setDrawColor(241, 245, 249); // Slate 100
    doc.line(20, yPos, 190, yPos);
    yPos += 12;
  };

  const basicInfo = student?.Basic_Information || {};
  
  // Format the date uniquely if it's a valid date string
  let formattedDob = basicInfo?.Date_of_Birth || "—";
  if (formattedDob !== "—") {
    try {
      formattedDob = new Date(formattedDob).toLocaleDateString();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // Keep as string if parsing fails
    }
  }

  addSection("Basic Information", {
    "First Name": basicInfo?.First_Name,
    "Last Name": basicInfo?.Last_Name,
    "Email Address": basicInfo?.Email_Address,
    "Phone Number": basicInfo?.Phone_Number,
    "Date of Birth": formattedDob,
  });

  const addressDetails = student?.Address_Details || {};
  addSection("Address Information", {
    "Street Address": addressDetails?.Street_Address,
    "Apartment/Suite": addressDetails?.Apartment_Number,
    "City": addressDetails?.City,
    "State / Province": addressDetails?.State,
    "ZIP / Postal Code": addressDetails?.Postal_Code,
  });

  const eduBackground = student?.Educational_Background || {};
  addSection("Educational Background", {
    "Institution Name": eduBackground?.Institution_Name,
    "Year of Graduation": eduBackground?.Year_of_Graduation,
    "Major / Field of Study": eduBackground?.Field_of_Study,
    "CGPA / Percentage": eduBackground?.Percentage_or_CGPA,
  });

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // Slate 400
  let dateStamp = new Date().toLocaleString();
  if (student?.createdAt) {
      dateStamp = new Date(student.createdAt).toLocaleString();
  }
  doc.text(`Submitted on: ${dateStamp}`, 20, 285);

  const fileName = basicInfo?.First_Name 
    ? `${basicInfo.First_Name}_${basicInfo.Last_Name || 'Application'}.pdf` 
    : 'student_application.pdf';
    
  doc.save(fileName);
};
