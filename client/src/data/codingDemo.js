// De-identified sample chart used in the live coding micro-demo (Section E).
// No real patient data — synthetic teaching case only.
export const sampleChart = {
  id: 'demo-chart-001',
  department: 'Orthopedics',
  title: 'Outpatient Op Note — Synthetic Teaching Case',
  patient: 'Patient: [DE-IDENTIFIED] · Age 54 · Sex: F',
  narrative: [
    'Pre-op Dx: Complete tear of the right rotator cuff, nontraumatic, in a 54-year-old female with three months of progressive shoulder weakness.',
    'Procedure: Arthroscopic rotator cuff repair, right shoulder. Single-row anchor technique. Subacromial decompression performed in the same session.',
    'Anesthesia: General with interscalene nerve block.',
    'Findings: Full-thickness tear of the supraspinatus tendon confirmed on diagnostic arthroscopy. No labral involvement.',
    'Plan: Sling immobilization 4 weeks, outpatient physical therapy to follow at 2-week post-op visit.',
  ],
  prompt: 'Assign the primary diagnosis code (ICD-10-CM) and the primary procedure code (CPT) for this encounter.',
}

// Each option carries the validation logic a grader would apply.
export const codingOptions = {
  icd: [
    {
      code: 'M75.121',
      label: 'M75.121 — Complete rotator cuff tear/rupture, right shoulder, not specified as traumatic',
      correct: true,
      feedback: 'Correct. The note specifies "nontraumatic" and "complete tear," and laterality (right) is documented — M75.121 captures all three required elements.',
    },
    {
      code: 'M75.120',
      label: 'M75.120 — Complete rotator cuff tear, unspecified shoulder',
      correct: false,
      feedback: 'Laterality is documented in the note ("right shoulder"). Coding to "unspecified" when a side is stated is a specificity error auditors flag first.',
    },
    {
      code: 'S46.011A',
      label: 'S46.011A — Strain of muscle, fascia and tendon of the rotator cuff, right shoulder, initial encounter',
      correct: false,
      feedback: 'This is the traumatic-injury code family. The note explicitly documents a nontraumatic, degenerative tear — the S-code would misrepresent etiology.',
    },
  ],
  cpt: [
    {
      code: '29827',
      label: '29827 — Arthroscopy, shoulder, surgical; with rotator cuff repair',
      correct: true,
      feedback: 'Correct. The op note documents arthroscopic technique with single-row anchor repair — 29827 is the specific arthroscopic rotator cuff repair code.',
    },
    {
      code: '23410',
      label: '23410 — Repair of ruptured musculotendinous cuff, open; acute',
      correct: false,
      feedback: 'This code family is for open repair of an acute tear. The note documents an arthroscopic approach and a chronic, nontraumatic tear — wrong approach and wrong acuity.',
    },
    {
      code: '29826',
      label: '29826 — Arthroscopy, shoulder, surgical; decompression of subacromial space',
      correct: false,
      feedback: 'Close, but incomplete: 29826 only reports the decompression. Since it was performed at the same session as the cuff repair, it is typically bundled and reported as an add-on — not billed as the primary code.',
    },
  ],
}
