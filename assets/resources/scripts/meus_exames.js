const defaultExams = [
  {
    id: "1",
    title: "Hemograma Completo",
    date: "12/05/2024",
    category: "Laboratorial",
    catColor: "#86f2e4",
    catText: "#00201d",
    icon: "bloodtype",
    description:
      "Análise detalhada das células sanguíneas, incluindo contagem de hemácias, leucócitos e plaquetas para check-up de rotina.",
  },
  {
    id: "2",
    title: "Ressonância Magnética",
    date: "05/05/2024",
    category: "Imagem",
    catColor: "#dbe1ff",
    catText: "#00174b",
    icon: "radiology",
    description:
      "Exame de alta definição para avaliação de tecidos moles e articulação do ombro direito após queixa de dor crônica.",
  },
  {
    id: "3",
    title: "Eletrocardiograma (ECG)",
    date: "28/04/2024",
    category: "Cardíaco",
    catColor: "#d8e5e2",
    catText: "#121e1c",
    icon: "ecg",
    description:
      "Monitoramento do ritmo cardíaco e atividade elétrica do coração em repouso para avaliação pré-operatória.",
  },
];

function getFormattedCurrentDate() {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const d = new Date();
  return String(d.getDate()).padStart(2, "0") + " " + months[d.getMonth()];
}

function updateDashboardStats() {
  const exams = loadExams();
  const totalExames = document.getElementById("totalExames");
  const ultimaAtualizacao = document.getElementById("ultimaAtualizacao");

  if (totalExames) {
    totalExames.innerText = exams.length;
  }

  let lastUpdate = localStorage.getItem("medvew_last_update");
  if (!lastUpdate) {
    lastUpdate = getFormattedCurrentDate();
    localStorage.setItem("medvew_last_update", lastUpdate);
  }

  if (ultimaAtualizacao) {
    ultimaAtualizacao.innerText = lastUpdate;
  }
}

function loadExams() {
  let exams = JSON.parse(localStorage.getItem("medvew_exams"));
  if (!exams && !localStorage.getItem("medvew_seeded")) {
    exams = defaultExams;
    localStorage.setItem("medvew_exams", JSON.stringify(exams));
    localStorage.setItem("medvew_last_update", getFormattedCurrentDate());
    localStorage.setItem("medvew_seeded", "true");
  }
  return exams || [];
}

function parseDate(dateStr) {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
}

function renderExams(searchTerm = "", sortOrder = "recentes") {
  let exams = loadExams();

  if (searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    exams = exams.filter(
      (exam) =>
        exam.title.toLowerCase().includes(searchTerm) ||
        exam.description.toLowerCase().includes(searchTerm) ||
        exam.category.toLowerCase().includes(searchTerm),
    );
  }

  if (sortOrder === "recentes") {
    exams.sort((a, b) => parseDate(b.date) - parseDate(a.date));
  } else if (sortOrder === "antigos") {
    exams.sort((a, b) => parseDate(a.date) - parseDate(b.date));
  } else if (sortOrder === "tipo") {
    exams.sort((a, b) => a.category.localeCompare(b.category));
  }

  const container = document.querySelector(".exam-list");
  updateDashboardStats();

  if (!container) return;

  if (exams.length === 0) {
    container.innerHTML =
      '<div class="alert alert-info text-center mb-0">Nenhum exame cadastrado no histórico.</div>';
    return;
  }

  container.innerHTML = exams
    .map(
      (exam) => `
            <div class="card exam-card mb-3 p-3 p-sm-4">
                <div class="row g-0 g-sm-2">
                    <div class="col-auto">
                        <div class="exam-icon-wrapper bg-light rounded p-2 p-sm-3">
                            <span class="material-symbols-outlined fs-2" style="font-size: clamp(1.5rem, 5vw, 2rem);">${exam.icon}</span>
                        </div>
                    </div>
                    <div class="col">
                        <h5 class="fw-bold mb-2" style="font-size: clamp(0.95rem, 2.5vw, 1.1rem);">${exam.title}</h5>
                        <div class="d-flex align-items-center gap-2 text-muted mb-3 flex-wrap" style="font-size: clamp(11px, 2vw, 13px);">
                            <span class="d-flex align-items-center gap-1"><span class="material-symbols-outlined fs-6">event</span> ${exam.date}</span>
                            <span class="d-none d-sm-inline" style="font-size: 8px;">●</span>
                            <span class="badge bg-light text-dark" style="color: #00201d !important; font-size: 0.75rem;">${exam.category}</span>
                        </div>
                        <p class="text-muted mb-0 small" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 0.85rem;">${exam.description}</p>
                    </div>
                </div>
                <div class="row mt-3 pt-3 border-top g-2">
                    <div class="col-12">
                        <div class="d-flex flex-wrap gap-2">
                            <button class="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 flex-grow-1 flex-sm-grow-0 justify-content-center" onclick="window.location.href='../novo_exame/novo_exame.html?edit=${exam.id}'">
                                <span class="material-symbols-outlined d-none d-sm-inline" style="font-size: 18px;">edit_square</span>
                                <span style="font-size: clamp(0.75rem, 2vw, 0.875rem);">Editar</span>
                            </button>
                            <button class="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 flex-grow-1 flex-sm-grow-0 justify-content-center" onclick="viewExam('${exam.id}')">
                                <span class="material-symbols-outlined d-none d-sm-inline" style="font-size: 18px;">visibility</span>
                                <span style="font-size: clamp(0.75rem, 2vw, 0.875rem);">Ver</span>
                            </button>
                            <button class="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 flex-grow-1 flex-sm-grow-0 justify-content-center" onclick="deleteExam('${exam.id}')">
                                <span class="material-symbols-outlined d-none d-sm-inline" style="font-size: 18px;">delete</span>
                                <span style="font-size: clamp(0.75rem, 2vw, 0.875rem);">Apagar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `,
    )
    .join("");
}

window.deleteExam = function (id) {
  if (confirm("Tem certeza que deseja excluir esse exame do histórico?")) {
    let exams = loadExams();
    exams = exams.filter((e) => e.id !== id);
    localStorage.setItem("medvew_exams", JSON.stringify(exams));
    localStorage.setItem("medvew_last_update", getFormattedCurrentDate());
    renderExams();
  }
};

window.viewExam = function (id) {
  const exams = loadExams();
  const exam = exams.find((e) => e.id === id);
  if (exam) {
    const modalTitle = document.getElementById("modalExamTitle");
    const modalDate = document.getElementById("modalExamDate");
    const modalDesc = document.getElementById("modalExamDesc");

    if (modalTitle) modalTitle.innerText = exam.title;
    if (modalDate) modalDate.innerText = "Realizado em: " + exam.date;
    if (modalDesc) modalDesc.innerText = exam.description;

    const modal = new bootstrap.Modal(document.getElementById("viewExamModal"));
    modal.show();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  renderExams();

  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");
  const closeSidebar = document.getElementById("closeSidebar");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });
  }

  if (closeSidebar && sidebar) {
    closeSidebar.addEventListener("click", () => {
      sidebar.classList.remove("show");
    });
  }

  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 991.98 &&
      sidebar &&
      !sidebar.contains(e.target) &&
      !sidebarToggle?.contains(e.target)
    ) {
      sidebar.classList.remove("show");
    }
  });

  const searchInput = document.getElementById("searchInput");
  const filterSelect = document.getElementById("filterSelect");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderExams(e.target.value, filterSelect.value);
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", (e) => {
      renderExams(searchInput.value, e.target.value);
    });
  }

  const userName = localStorage.getItem("medvew_user_name");
  if (userName) {
    document.querySelectorAll(".user-name-display").forEach((el) => {
      if (el.tagName === "INPUT") {
        el.value = userName;
      } else {
        el.innerText = userName;
      }
    });
  }
});
