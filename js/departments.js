/**
 * CODIVIA — 22 Clinical Departments Dataset & Matrix Renderer
 */

export const departments = [
  {
    id: 'cardiology',
    index: '01',
    name: 'Cardiology',
    focus: 'Cath lab notes, echo reports, EP studies',
    icd: 'I20–I52, Z95',
    cpt: '93000–93799',
    hcpcs: 'C1721, C1777',
    charts: 940,
  },
  {
    id: 'orthopedics',
    index: '02',
    name: 'Orthopedics',
    focus: 'Fracture care, joint replacement, arthroscopy',
    icd: 'S42–S82, M17',
    cpt: '27130–27447',
    hcpcs: 'L1832, L3908',
    charts: 1120,
  },
  {
    id: 'radiology',
    index: '03',
    name: 'Radiology',
    focus: 'CT, MRI, mammography, interventional imaging',
    icd: 'R91, R93',
    cpt: '70450–77067',
    hcpcs: 'G0279',
    charts: 875,
  },
  {
    id: 'emergency',
    index: '04',
    name: 'Emergency Medicine',
    focus: 'Trauma, triage acuity, multi-system injury notes',
    icd: 'S00–T88',
    cpt: '99281–99285',
    hcpcs: 'G0380–G0384',
    charts: 1310,
  },
  {
    id: 'general-surgery',
    index: '05',
    name: 'General Surgery',
    focus: 'Laparoscopic, hernia, appendectomy op notes',
    icd: 'K35, K40',
    cpt: '44950–49585',
    hcpcs: 'C1874',
    charts: 690,
  },
  {
    id: 'oncology',
    index: '06',
    name: 'Oncology',
    focus: 'Chemo administration, staging, tumor boards',
    icd: 'C00–C96, Z51',
    cpt: '96401–96549',
    hcpcs: 'J9000–J9999',
    charts: 780,
  },
  {
    id: 'obgyn',
    index: '07',
    name: 'OB/GYN',
    focus: 'Prenatal visits, delivery notes, gynecologic surgery',
    icd: 'O09–O99',
    cpt: '59400–59622',
    hcpcs: 'S0612',
    charts: 610,
  },
  {
    id: 'pediatrics',
    index: '08',
    name: 'Pediatrics',
    focus: 'Well-child visits, immunization, growth charts',
    icd: 'P00–P96, Z00',
    cpt: '99381–99395',
    hcpcs: 'G0008–G0010',
    charts: 705,
  },
  {
    id: 'neurology',
    index: '09',
    name: 'Neurology',
    focus: 'EEG/EMG studies, stroke workups, seizure logs',
    icd: 'G00–G99',
    cpt: '95810–95930',
    hcpcs: 'G0451',
    charts: 560,
  },
  {
    id: 'dermatology',
    index: '10',
    name: 'Dermatology',
    focus: 'Lesion excision, biopsy, Mohs surgery',
    icd: 'C43, L57, L98',
    cpt: '11400–17311',
    hcpcs: 'G0127',
    charts: 480,
  },
  {
    id: 'gastroenterology',
    index: '11',
    name: 'Gastroenterology',
    focus: 'Endoscopy, colonoscopy, hepatology follow-ups',
    icd: 'K20–K93',
    cpt: '43235–45385',
    hcpcs: 'G0121',
    charts: 615,
  },
  {
    id: 'pulmonology',
    index: '12',
    name: 'Pulmonology',
    focus: 'PFTs, ventilator management, sleep studies',
    icd: 'J40–J99',
    cpt: '94010–94799',
    hcpcs: 'E0470',
    charts: 505,
  },
  {
    id: 'nephrology',
    index: '13',
    name: 'Nephrology',
    focus: 'Dialysis notes, CKD staging, transplant workups',
    icd: 'N00–N29',
    cpt: '90935–90999',
    hcpcs: 'A4650–A4913',
    charts: 470,
  },
  {
    id: 'endocrinology',
    index: '14',
    name: 'Endocrinology',
    focus: 'Diabetes management, thyroid panels',
    icd: 'E08–E35',
    cpt: '95250–95251',
    hcpcs: 'A4230–A4259',
    charts: 530,
  },
  {
    id: 'urology',
    index: '15',
    name: 'Urology',
    focus: 'Cystoscopy, prostate procedures, stone removal',
    icd: 'N20–N53',
    cpt: '52000–55866',
    hcpcs: 'C2617',
    charts: 415,
  },
  {
    id: 'ent',
    index: '16',
    name: 'ENT (Otolaryngology)',
    focus: 'Sinus surgery, hearing tests, tonsillectomy',
    icd: 'H60–J39',
    cpt: '30520–42826',
    hcpcs: 'V5008–V5299',
    charts: 390,
  },
  {
    id: 'ophthalmology',
    index: '17',
    name: 'Ophthalmology',
    focus: 'Cataract surgery, retinal imaging, glaucoma care',
    icd: 'H25–H59',
    cpt: '65091–67229',
    hcpcs: 'V2020–V2799',
    charts: 445,
  },
  {
    id: 'psych',
    index: '18',
    name: 'Psychiatry & Behavioral Health',
    focus: 'Intake evaluations, therapy notes, med management',
    icd: 'F01–F99',
    cpt: '90791–90899',
    hcpcs: 'H0031–H0038',
    charts: 520,
  },
  {
    id: 'anesthesiology',
    index: '19',
    name: 'Anesthesiology',
    focus: 'Pre-op assessments, intraoperative records',
    icd: 'Z01, T88',
    cpt: '00100–01999',
    hcpcs: 'G0475',
    charts: 360,
  },
  {
    id: 'pmr',
    index: '20',
    name: 'Physical Medicine & Rehab',
    focus: 'Therapy plans, functional assessments',
    icd: 'M54, S13–S39',
    cpt: '97110–97762',
    hcpcs: 'G0281–G0283',
    charts: 385,
  },
  {
    id: 'infectious-disease',
    index: '21',
    name: 'Infectious Disease',
    focus: 'Sepsis workups, isolation protocols, cultures',
    icd: 'A00–B99',
    cpt: '87070–87999',
    hcpcs: 'G0480–G0483',
    charts: 355,
  },
  {
    id: 'ambulatory',
    index: '22',
    name: 'Ambulatory / Outpatient E/M',
    focus: 'Primary care visits, annual wellness, chronic care',
    icd: 'Z00–Z99',
    cpt: '99202–99215',
    hcpcs: 'G0438–G0439',
    charts: 1160,
  },
]

export function renderDepartmentsMatrix(containerId) {
  const container = document.getElementById(containerId)
  if (!container) return

  container.innerHTML = departments
    .map((dept, i) => {
      const isEven = i % 2 === 0
      const rowClass = isEven ? 'dept-row-even' : 'dept-row-odd'

      return `
        <div class="dept-row ${rowClass}" id="dept-row-${dept.id}">
          <button class="dept-header-btn" onclick="window.toggleDept('${dept.id}')">
            <!-- Big Square 3D Image Icon -->
            <div class="dept-icon-box">
              <img src="/departments/${dept.id}.png" alt="${dept.name}" loading="lazy" />
            </div>

            <!-- 2-Row Text Stack -->
            <div class="dept-text-stack">
              <div style="display: flex; align-items: baseline; gap: 0.5rem; ${isEven ? '' : 'flex-direction: row-reverse;'}">
                <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(20, 18, 16, 0.5);">DEPT</span>
                <span class="dept-index-num">${dept.index}</span>
                <span style="font-size: 0.75rem; font-family: var(--font-mono); color: rgba(20, 18, 16, 0.4); margin-left: 0.5rem;">• ${dept.charts} Charts</span>
              </div>
              <h3 class="dept-title">${dept.name}</h3>
            </div>

            <!-- Specialty Summary (desktop) -->
            <div style="display: none; font-size: 0.875rem; color: rgba(20, 18, 16, 0.5); padding: 0 1rem;" class="desktop-focus-text">
              ${dept.focus}
            </div>

            <!-- Toggle Plus Icon -->
            <div style="width: 2rem; height: 2rem; border-radius: 9999px; border: 1px solid rgba(20, 18, 16, 0.2); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: var(--color-charcoal); flex-shrink: 0;" class="dept-toggle-icon">
              +
            </div>
          </button>

          <!-- Accordion Content -->
          <div class="dept-accordion-content" id="dept-content-${dept.id}">
            <div class="code-suites-grid" style="margin-top: 1rem;">
              <div class="code-card">
                <span class="code-badge-pill">ICD-10-CM</span>
                <div class="code-range-val">${dept.icd}</div>
                <div style="font-size: 0.75rem; color: rgba(20, 18, 16, 0.5); margin-top: 0.25rem;">Diagnostic codes</div>
              </div>
              <div class="code-card">
                <span class="code-badge-pill">CPT®-4</span>
                <div class="code-range-val">${dept.cpt}</div>
                <div style="font-size: 0.75rem; color: rgba(20, 18, 16, 0.5); margin-top: 0.25rem;">Procedural suites</div>
              </div>
              <div class="code-card">
                <span class="code-badge-pill">HCPCS LEVEL II</span>
                <div class="code-range-val">${dept.hcpcs}</div>
                <div style="font-size: 0.75rem; color: rgba(20, 18, 16, 0.5); margin-top: 0.25rem;">Devices & supplies</div>
              </div>
            </div>
          </div>
        </div>
      `
    })
    .join('')
}

window.toggleDept = function(deptId) {
  const row = document.getElementById(`dept-row-${deptId}`)
  const isAlreadyOpen = row.classList.contains('open')

  // Close other open rows
  document.querySelectorAll('.dept-row').forEach(r => {
    r.classList.remove('open')
    const icon = r.querySelector('.dept-toggle-icon')
    if (icon) icon.textContent = '+'
  })

  if (!isAlreadyOpen) {
    row.classList.add('open')
    const icon = row.querySelector('.dept-toggle-icon')
    if (icon) icon.textContent = '×'
  }
}
