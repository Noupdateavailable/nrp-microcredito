import type { Dictionary } from "./pt";

const en: Dictionary = {
  meta: {
    title: "NRP Microcrédito — Fast, fair credit in Mozambique",
    description:
      "Microcredit for businesses, families and entrepreneurs in Mozambique. Apply online in a few minutes.",
  },
  nav: {
    products: "Products",
    how: "How it works",
    requirements: "Requirements",
    faq: "FAQ",
    contact: "Contact",
    apply: "Apply now",
    skip: "Skip to content",
    menu: "Menu",
    language: "Language",
  },
  hero: {
    eyebrow: "Microcredit in Mozambique",
    title: "Simple credit to grow your business and support your family",
    subtitle:
      "Amounts from 1,000 to 500,000 MZN, terms from 1 to 24 months, and an answer within {hours} hours.",
    cta: "Apply for credit",
    secondary: "See products",
    stats: [
      { value: "1,000–500,000", label: "MZN per loan" },
      { value: "1–24", label: "months to repay" },
      { value: "{hours}h", label: "to get an answer" },
    ],
  },
  products: {
    title: "Choose the right credit for you",
    subtitle: "Three products built around how people work in Mozambique.",
    items: {
      business: {
        name: "Business Credit",
        description:
          "To buy stock or equipment, or add working capital to your shop, stall or workshop.",
      },
      personal: {
        name: "Personal Credit",
        description:
          "For family expenses: school fees, health, home repairs or an unexpected emergency.",
      },
      entrepreneur: {
        name: "Entrepreneur Credit",
        description:
          "For people starting a business who need a first push to get going.",
      },
    },
    cta: "Apply for this credit",
  },
  how: {
    title: "How it works",
    steps: [
      {
        title: "Apply",
        text: "Fill in the online form in a few minutes, on your phone or computer.",
      },
      {
        title: "We review",
        text: "Our team reviews your request and contacts you within {hours} hours.",
      },
      {
        title: "Bring your documents",
        text: "We arrange how to receive your documents and confirm the terms with you.",
      },
      {
        title: "Get the money",
        text: "Once approved, the money is released quickly and securely.",
      },
    ],
  },
  requirements: {
    title: "What you need",
    subtitle: "Have these documents ready to speed up the review.",
    items: [
      "Valid identity card (BI)",
      "NUIT (tax number)",
      "Proof of address",
      "Proof of income or business activity",
      "An active mobile number",
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "How much can I borrow?",
        a: "You can ask for 1,000 to 500,000 MZN. The approved amount depends on the review of your application.",
      },
      {
        q: "How soon will I get an answer?",
        a: "We answer every application within {hours} working hours.",
      },
      {
        q: "Does applying online cost anything?",
        a: "No. Applying online is free and does not commit you to taking the loan.",
      },
      {
        q: "Is my data safe?",
        a: "Yes. Application data is stored securely and only the NRP team can access it.",
      },
    ],
  },
  contact: {
    title: "Talk to us",
    subtitle: "Prefer to speak to a person? We're here to help.",
    phone: "Phone",
    whatsapp: "WhatsApp",
    whatsappCta: "Send a message",
    email: "Email",
    address: "Address",
    hours: "Opening hours",
  },
  footer: {
    rights: "All rights reserved.",
    staff: "Staff area",
  },
  apply: {
    metaTitle: "Apply for credit — NRP Microcrédito",
    title: "Credit application",
    subtitle:
      "Fill in the details below. It takes about 3 minutes and we answer within {hours} hours.",
    sections: {
      you: "About you",
      loan: "The loan",
    },
    fields: {
      fullName: "Full name",
      phone: "Mobile number",
      phoneHint: "E.g. 84 123 4567",
      email: "Email (optional)",
      city: "City or district",
      occupation: "Job or business activity",
      income: "Monthly income",
      product: "Type of credit",
      amount: "Amount (MZN)",
      amountHint: "Between 1,000 and 500,000 MZN",
      term: "Term (months)",
      termHint: "Between 1 and 24 months",
      purpose: "What will you use the loan for?",
      purposeHint: "Describe it briefly (at least 10 characters).",
      consent:
        "I allow NRP Microcrédito to use this information to review my application and contact me.",
    },
    income: {
      lt10k: "Under 10,000 MZN",
      "10to25k": "10,000 to 25,000 MZN",
      "25to50k": "25,000 to 50,000 MZN",
      gt50k: "Over 50,000 MZN",
    },
    select: "Choose an option",
    submit: "Send application",
    submitting: "Sending…",
    errors: {
      fullName: "Enter your full name (3 to 120 characters).",
      phone: "Enter a valid Mozambican mobile number (e.g. 84 123 4567).",
      email: "That email doesn't look right.",
      city: "Enter your city or district.",
      occupation: "Enter your job or business activity.",
      income: "Choose your monthly income.",
      product: "Choose the type of credit.",
      amount: "The amount must be between 1,000 and 500,000 MZN.",
      term: "The term must be between 1 and 24 months.",
      purpose: "Describe what the loan is for (10 to 1000 characters).",
      consent: "You need to allow us to use your data to continue.",
      form: "Please check the highlighted fields.",
      server: "We couldn't send your application. Please try again or call us.",
    },
    success: {
      title: "Application received!",
      text: "Thank you. Our team will call your mobile within {hours} hours.",
      back: "Back to home",
    },
  },
  staff: {
    metaTitle: "Staff area — NRP Microcrédito",
    loginTitle: "Sign in to the staff area",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    signingIn: "Signing in…",
    signOut: "Sign out",
    invalid: "Incorrect email or password.",
    notAdmin: "This account doesn't have access to the staff area.",
    title: "Credit applications",
    empty: "No applications yet.",
    loading: "Loading applications…",
    filterAll: "All",
    columns: {
      date: "Date",
      applicant: "Applicant",
      loan: "Loan",
      purpose: "Purpose",
      status: "Status",
    },
    months: "months",
    statuses: {
      new: "New",
      reviewing: "Reviewing",
      approved: "Approved",
      rejected: "Rejected",
    },
    save: "Save",
    updateFailed: "Couldn't update the status.",
  },
  notFound: {
    title: "Page not found",
    back: "Back to home",
  },
};

export default en;
