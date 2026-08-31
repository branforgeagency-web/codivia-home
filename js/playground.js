/**
 * CODIVIA — Interactive Code Playground Sandbox
 */

const encounters = {
  cardiology: {
    id: 'ENC-882',
    department: 'Cardiology Cath Lab',
    physician: 'Dr. E. Vance, MD, FACC',
    diagnosis: 'Acute Subendocardial Infarction (NSTEMI), LAD Stenosis',
    narrative: `62yo male presented with retrosternal crushing chest pain, diaphoresis. EKG showed ST depressions in V3-V6. Troponin I elevated at 4.2 ng/mL. Diagnostic angiogram revealed 95% proximal LAD stenosis. Successful deployment of 3.5 x 18mm drug-eluting stent. Post-dilation with 3.75mm NC balloon achieved 0% residual stenosis with TIMI 3 flow.`,
    codes: [
      { type: 'ICD-10-CM', code: 'I21.4', desc: 'Non-ST elevation (NSTEMI) myocardial infarction', match: '99.8%' },
      { type: 'CPT-4', code: '92928-LD', desc: 'Percutaneous coronary intervention, single vessel LAD stent', match: 'Clean Claim' },
      { type: 'HCPCS II', code: 'C1769', desc: 'Guide wire, diagnostic/interventional cardiology', match: '99.4%' }
    ]
  },
  orthopedics: {
    id: 'ENC-791',
    department: 'Orthopedic Surgery',
    physician: 'Dr. R. Sterling, MD, FAAOS',
    diagnosis: 'Right Knee Acute Complete ACL Rupture with Complex Medial Meniscus Tear',
    narrative: `24yo female athlete with non-contact pivot injury. MRI confirmed complete ACL disruption and bucket-handle tear medial meniscus. Arthroscopic-assisted reconstruction using quadrupled semitendinosus/gracilis autograft. Meniscal repair performed using inside-out suture technique with 2-0 FiberWire.`,
    codes: [
      { type: 'ICD-10-CM', code: 'S83.511A', desc: 'Complete tear of anterior cruciate ligament of right knee, initial', match: '100%' },
      { type: 'CPT-4', code: '29888-RT', desc: 'Arthroscopically aided ACL reconstruction, right knee', match: 'Clean Claim' },
      { type: 'CPT-4', code: '29882-RT', desc: 'Arthroscopy, knee, surgical; with meniscus repair', match: '99.2%' }
    ]
  }
}

let activeSpecialty = 'cardiology'

export function initPlayground() {
  renderEncounter(activeSpecialty)
}

export function switchSpecialty(spec) {
  activeSpecialty = spec
  document.querySelectorAll('.spec-tab-btn').forEach(btn => {
    btn.classList.remove('active-tab')
  })
  const activeBtn = document.getElementById(`tab-btn-${spec}`)
  if (activeBtn) activeBtn.classList.add('active-tab')

  renderEncounter(spec)
}

function renderEncounter(spec) {
  const data = encounters[spec]
  if (!data) return

  const container = document.getElementById('playground-display')
  if (!container) return

  container.innerHTML = `
    <div style="background: #1D1A17; border-radius: 1.25rem; border: 1px solid rgba(245, 241, 236, 0.1); padding: 1.5rem; color: var(--color-bone);">
      <!-- Encounter Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(245, 241, 236, 0.1); padding-bottom: 1rem; margin-bottom: 1.25rem;">
        <div>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 800; color: var(--color-accent);">${data.id}</span>
          <h4 style="font-size: 1.15rem; font-weight: 800; margin-top: 0.2rem;">${data.department}</h4>
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: rgba(245, 241, 236, 0.5);">${data.physician}</div>
      </div>

      <!-- Clinical Report Narrative -->
      <div style="background: rgba(0,0,0,0.3); border-radius: 0.75rem; padding: 1.25rem; font-size: 0.875rem; line-height: 1.6; color: rgba(245, 241, 236, 0.85); margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.05);">
        <strong style="color: #fff; display: block; margin-bottom: 0.5rem; font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">Operative Documentation:</strong>
        ${data.narrative}
      </div>

      <!-- Extracted Code Suite -->
      <div>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: rgba(245, 241, 236, 0.6); text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 0.75rem;">Engine Code Extraction:</span>
        <div style="display: grid; grid-template-columns: 1fr; gap: 0.75rem;">
          ${data.codes.map(c => `
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 0.75rem; padding: 0.85rem 1.25rem;">
              <div>
                <span style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 800; color: var(--color-accent); margin-right: 0.5rem;">${c.type}</span>
                <strong style="font-family: var(--font-mono); font-size: 1rem; color: #fff;">${c.code}</strong>
                <div style="font-size: 0.8rem; color: rgba(245, 241, 236, 0.6); margin-top: 0.2rem;">${c.desc}</div>
              </div>
              <span style="background: rgba(242, 103, 34, 0.15); color: var(--color-accent); border: 1px solid rgba(242, 103, 34, 0.3); padding: 0.25rem 0.6rem; border-radius: 9999px; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 800;">${c.match}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `
}

window.switchSpecialty = switchSpecialty
