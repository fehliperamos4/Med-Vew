let examsData = null;

async function loadExamsData() {
  try {
    const response = await fetch("../../../assets/resources/scripts/exames.json");
    examsData = await response.json();
  } catch (error) {
    console.error("Erro ao carregar exames:", error);
  }
}

function renderExamDropdown() {
  const dropdown = document.getElementById("examDropdown");
  if (!examsData || !dropdown) return;

  let html = "";
  examsData.categorias.forEach((categoria) => {
    html += `<div class="exam-category">${categoria.nome}</div>`;
    categoria.exames.forEach((exame) => {
      html += `<div class="exam-option" data-exam="${exame}">${exame}</div>`;
    });
  });

  dropdown.innerHTML = html;
  document.querySelectorAll(".exam-option").forEach((option) => {
    option.addEventListener("click", function () {
      selectExam(this.getAttribute("data-exam"));
    });
  });
}

function selectExam(examName) {
  const examTitle = document.getElementById("examTitle");
  if (examTitle) {
    examTitle.value = examName;
  }
  const dropdown = document.getElementById("examDropdown");
  if (dropdown) {
    dropdown.classList.add("d-none");
  }
}

function toggleExamDropdown() {
  const dropdown = document.getElementById("examDropdown");
  if (!dropdown) return;

  if (dropdown.classList.contains("d-none")) {
    renderExamDropdown();
    dropdown.classList.remove("d-none");
  } else {
    dropdown.classList.add("d-none");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadExamsData();

  const examTitle = document.getElementById("examTitle");
  if (examTitle) {
    examTitle.addEventListener("click", toggleExamDropdown);
  }

  document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("examDropdown");
    const wrapper = document.querySelector(".exam-selector-wrapper");
    if (
      wrapper &&
      !wrapper.contains(event.target) &&
      event.target.id !== "examTitle"
    ) {
      if (dropdown) {
        dropdown.classList.add("d-none");
      }
    }
  });

  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });
  }

  document.addEventListener("click", function (event) {
    if (
      sidebar &&
      sidebar.classList.contains("show") &&
      !sidebar.contains(event.target) &&
      !sidebarToggle?.contains(event.target)
    ) {
      sidebar.classList.remove("show");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const editId = params.get("edit");
  if (editId) {
    const titleElement = document.querySelector("h1.display-6");
    if (titleElement) {
      titleElement.innerText = "Editar Exame";
    }

    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.innerHTML =
        'Salvar Alterações <span class="material-symbols-outlined fs-5">check_circle</span>';
    }

    let exams = JSON.parse(localStorage.getItem("medvew_exams")) || [];
    let examToEdit = exams.find((e) => e.id === editId);
    if (examToEdit) {
      const examTitle = document.getElementById("examTitle");
      const examDate = document.getElementById("examDate");
      const examDesc = document.getElementById("examDesc");

      if (examTitle) {
        examTitle.value = examToEdit.title;
      }
      if (examDate && examToEdit.date) {
        examDate.value = examToEdit.date.split("/").reverse().join("-");
      }
      if (examDesc) {
        examDesc.value = examToEdit.description;
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newExamForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("examTitle").value;
    const date = document.getElementById("examDate").value;
    const desc = document.getElementById("examDesc").value;

    if (!title || !date) {
      alert("Preencha pelo menos o título e data!");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const editId = params.get("edit");

    let exams = JSON.parse(localStorage.getItem("medvew_exams"));
    if (!exams) exams = [];

    if (editId) {
      const index = exams.findIndex((e) => e.id === editId);
      if (index > -1) {
        exams[index].title = title;
        exams[index].date = date.split("-").reverse().join("/");
        exams[index].descrFiption = desc || exams[index].description;
      }
    } else {
      const newExam = {
        id: Date.now().toString(),
        title: title,
        date: date.split("-").reverse().join("/"),
        category: "Clínico",
        catColor: "#e5eeff",
        catText: "#004ac6",
        icon: "medical_services",
        description: desc || "Nenhuma descrição detalhada.",
      };
      exams.unshift(newExam);
    }

    localStorage.setItem("medvew_exams", JSON.stringify(exams));

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
    const formattedDate =
      String(d.getDate()).padStart(2, "0") + " " + months[d.getMonth()];
    localStorage.setItem("medvew_last_update", formattedDate);

    window.location.href = "../meus_exames/meus_exames.html";
  });
});

document.addEventListener("DOMContentLoaded", function () {
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
