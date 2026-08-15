const storageKey = "habit-tracker:v2";

const iconPaths = {
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m15 9 4-4"/><path d="M19 5h-3V2"/><circle cx="12" cy="12" r="1"/>',
  chart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20V7"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  "check-circle": '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  flame: '<path d="M8.5 14.5A3.5 3.5 0 0 0 12 18a3.5 3.5 0 0 0 3.5-3.5c0-2.4-1.5-3.8-2.9-5.2-.9-.9-1.6-1.8-1.7-3.3-2.1 1.2-3.4 3.3-3.4 5.5 0 1.1.4 2.1 1 3Z"/><path d="M12 18c4.4 0 7-2.9 7-6.6 0-4-3.1-6.6-5.1-9-.1 2.3-.8 3.7-2 4.8C10.4 5.9 9.8 4.8 9.7 3 7 5.1 5 8.2 5 11.5 5 15.2 7.6 18 12 18Z"/>',
  trend: '<path d="m3 17 6-6 4 4 7-8"/><path d="M14 7h6v6"/>',
  star: '<path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.7-4.6 6.5-.9L12 3Z"/>',
  "chevron-left": '<path d="m15 18-6-6 6-6"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "chevron-up": '<path d="m18 15-6-6-6 6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  circle: '<circle cx="12" cy="12" r="7"/>',
  dumbbell: '<path d="M6 7v10"/><path d="M18 7v10"/><path d="M2 9v6"/><path d="M22 9v6"/><path d="M6 12h12"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
  code: '<path d="m10 17 4-10"/><path d="m6 8-4 4 4 4"/><path d="m18 8 4 4-4 4"/>',
  droplet: '<path d="M12 2.5S5 10 5 15a7 7 0 0 0 14 0c0-5-7-12.5-7-12.5Z"/>',
  lotus: '<path d="M12 20c-3-2-5-5-5-8 3 1 5 3 5 8Z"/><path d="M12 20c3-2 5-5 5-8-3 1-5 3-5 8Z"/><path d="M12 20c-1.5-3-1.5-6 0-9 1.5 3 1.5 6 0 9Z"/><path d="M5 20h14"/>',
  pencil: '<path d="M12 20h9"/><path d="m16.5 3.5 4 4L8 20H4v-4L16.5 3.5Z"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sidebar: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="m15 10-2 2 2 2"/>'
};

const today = startOfDay(new Date());
const state = loadState();
let currentWeekStart = startOfWeek(today);
let selectedHabitId = state.selectedHabitId || state.habits[0]?.id || "";

const elements = {
  appShell: document.querySelector("#app-shell"),
  sidebarToggle: document.querySelector("#sidebar-toggle"),
  navItems: document.querySelectorAll("[data-tab-target]"),
  tabPanels: document.querySelectorAll("[data-tab-panel]"),
  greeting: document.querySelector("#greeting"),
  todayLabel: document.querySelector("#today-label"),
  homeEmpty: document.querySelector("#home-empty"),
  homeHabits: document.querySelector("#home-habits"),
  tableHead: document.querySelector("#table-head"),
  habitRows: document.querySelector("#habit-rows"),
  habitList: document.querySelector("#habit-list"),
  weekLabel: document.querySelector("#week-label"),
  prevWeek: document.querySelector("#prev-week"),
  nextWeek: document.querySelector("#next-week"),
  metricDone: document.querySelector("#metric-done"),
  metricStreak: document.querySelector("#metric-streak"),
  metricRate: document.querySelector("#metric-rate"),
  metricActive: document.querySelector("#metric-active"),
  metricDoneStats: document.querySelector("#metric-done-stats"),
  metricStreakStats: document.querySelector("#metric-streak-stats"),
  metricRateStats: document.querySelector("#metric-rate-stats"),
  detail: document.querySelector("#stats"),
  dialog: document.querySelector("#habit-dialog"),
  form: document.querySelector("#habit-form"),
  formTitle: document.querySelector("#form-title"),
  openForm: document.querySelector("#open-form"),
  openFormHabits: document.querySelector("#open-form-habits"),
  closeForm: document.querySelector("#close-form"),
  deleteHabit: document.querySelector("#delete-habit"),
  habitId: document.querySelector("#habit-id"),
  habitName: document.querySelector("#habit-name"),
  habitCategory: document.querySelector("#habit-category"),
  habitColor: document.querySelector("#habit-color")
};

document.querySelectorAll("[data-icon]").forEach((node) => {
  node.innerHTML = iconSvg(node.dataset.icon);
});

elements.greeting.textContent = periodGreeting();
elements.todayLabel.textContent = formatFullDate(today);

elements.sidebarToggle.addEventListener("click", () => {
  const isCollapsed = elements.appShell.classList.toggle("sidebar-collapsed");
  elements.sidebarToggle.setAttribute("aria-expanded", String(!isCollapsed));
  elements.sidebarToggle.setAttribute("aria-label", isCollapsed ? "Expandir menu" : "Recolher menu");
});

elements.navItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    activateTab(item.dataset.tabTarget);
  });
});

elements.prevWeek.addEventListener("click", () => {
  currentWeekStart = addDays(currentWeekStart, -7);
  render();
});

elements.nextWeek.addEventListener("click", () => {
  currentWeekStart = addDays(currentWeekStart, 7);
  render();
});

elements.openForm.addEventListener("click", () => openHabitForm());
elements.openFormHabits.addEventListener("click", () => openHabitForm());
elements.closeForm.addEventListener("click", () => elements.dialog.close());

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  saveHabitFromForm();
});

elements.deleteHabit.addEventListener("click", () => {
  const id = elements.habitId.value;
  if (!id) return;
  state.habits = state.habits.filter((habit) => habit.id !== id);
  selectedHabitId = state.habits[0]?.id;
  persist();
  elements.dialog.close();
  render();
});

render();
activateTab(new URLSearchParams(window.location.search).get("tab") || "home");

function render() {
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(currentWeekStart, index));
  elements.weekLabel.textContent = isSameDay(currentWeekStart, startOfWeek(today)) ? "Esta semana" : weekRangeLabel(weekDays);
  renderHeader(weekDays);
  renderRows(weekDays);
  renderHabitList();
  renderHomeHabits();
  renderMetrics(weekDays);
  renderDetail(weekDays);
}

function activateTab(tabName) {
  elements.navItems.forEach((item) => {
    item.classList.toggle("active", item.classList.contains("nav-item") && item.dataset.tabTarget === tabName);
  });
  elements.tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.tabPanel === tabName);
  });
}

function renderHeader(weekDays) {
  elements.tableHead.innerHTML = [
    "<th>Hábito</th>",
    ...weekDays.map((date) => `<th><span class="day-label">${formatWeekday(date)}<small>${date.getDate()}</small></span></th>`),
    "<th>Resumo</th>"
  ].join("");
}

function renderHabitList() {
  if (!state.habits.length) {
    elements.habitList.innerHTML = `
      <div class="empty-panel inline-empty">
        <span class="empty-icon">${iconSvg("target")}</span>
        <h2>Nenhum hábito cadastrado</h2>
        <p>Adicione um hábito para começar a acompanhar sua constância.</p>
      </div>
    `;
    return;
  }

  elements.habitList.innerHTML = state.habits
    .map((habit) => {
      const stats = lifetimeStats(habit);
      return `
        <article class="habit-card tone-${habit.color}">
          <div class="habit-card-header">
            <button class="habit-main row-select" data-action="select" data-id="${habit.id}" type="button">
              <span class="habit-avatar">${iconSvg(habit.icon)}</span>
              <span class="habit-title">
                <strong>${escapeHtml(habit.name)}</strong>
                <span>${escapeHtml(habit.category)}</span>
              </span>
            </button>
            <div class="mini-stat">
              <span class="metric-icon">${iconSvg("flame")}</span>
              <div><strong>${stats.currentStreak} dias</strong><span>sequência atual</span></div>
            </div>
            <div class="mini-stat">
              <span class="ring" style="--value: ${stats.completionRate}"></span>
              <div><strong>${stats.completionRate}%</strong><span>conclusão</span></div>
            </div>
            <div class="habit-actions">
              <button class="icon-button" data-action="edit" data-id="${habit.id}" type="button" aria-label="Editar ${escapeHtml(habit.name)}">${iconSvg("pencil")}</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  elements.habitList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => handleTableAction(button));
  });
}

function renderHomeHabits() {
  if (!state.habits.length) {
    elements.homeHabits.innerHTML = "";
    return;
  }

  const todayKey = toDateKey(today);
  elements.homeHabits.innerHTML = `
    <section class="panel home-panel">
      <div class="panel-heading">
        <div>
          <h2>Hábitos de hoje</h2>
          <p class="panel-subtitle">${formatFullDate(today)}</p>
        </div>
        <button class="ghost-button compact-action" data-action="open-tab" data-tab="calendar" type="button">
          <span class="icon">${iconSvg("calendar")}</span>
          Calendário
        </button>
      </div>
      <div class="today-list">
        ${state.habits
          .map((habit) => {
            const stats = lifetimeStats(habit);
            const doneToday = habit.completions.includes(todayKey);
            return `
              <article class="today-card tone-${habit.color}">
                <button class="today-check ${doneToday ? "done" : ""}" data-action="toggle" data-id="${habit.id}" data-date="${todayKey}" type="button" aria-label="${doneToday ? "Desmarcar" : "Marcar"} ${escapeHtml(habit.name)} hoje">
                  ${iconSvg(doneToday ? "check" : "circle")}
                </button>
                <button class="today-info row-select" data-action="select-home" data-id="${habit.id}" type="button">
                  <span class="habit-avatar">${iconSvg(habit.icon)}</span>
                  <span class="habit-title">
                    <strong>${escapeHtml(habit.name)}</strong>
                    <span>${escapeHtml(habit.category)}</span>
                  </span>
                </button>
                <div class="today-stats">
                  <span><strong>${stats.currentStreak}</strong> dias</span>
                  <span><strong>${stats.completionRate}%</strong> conclusão</span>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `;

  elements.homeHabits.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => handleTableAction(button));
  });
}

function renderRows(weekDays) {
  if (!state.habits.length) {
    elements.habitRows.innerHTML = `<tr><td colspan="9"><p class="muted">Nenhum hábito ainda. Crie o primeiro para começar.</p></td></tr>`;
    return;
  }

  elements.habitRows.innerHTML = state.habits
    .map((habit) => {
      const weekStats = statsForWeek(habit, weekDays);
      return `
        <tr class="tone-${habit.color}">
          <td>
            <button class="row-select" data-action="select" data-id="${habit.id}" type="button">
              <span class="habit-name">
                <span class="habit-avatar">${iconSvg(habit.icon)}</span>
                <span class="habit-title">
                  <strong>${escapeHtml(habit.name)}</strong>
                  <span>${escapeHtml(habit.category)}</span>
                </span>
              </span>
            </button>
          </td>
          ${weekDays
            .map((date) => {
              const key = toDateKey(date);
              const status = habit.completions.includes(key) ? "done" : date <= today ? "missed" : "empty";
              const label = status === "done" ? "Concluído" : status === "missed" ? "Não concluído" : "Pendente";
              const icon = status === "done" ? "check" : status === "missed" ? "x" : "circle";
              return `<td><button class="day-button ${status}" data-action="toggle" data-id="${habit.id}" data-date="${key}" type="button" aria-label="${label}: ${habit.name}, ${formatFullDate(date)}">${iconSvg(icon)}</button></td>`;
            })
            .join("")}
          <td>${summaryMarkup(weekStats)}</td>
        </tr>
      `;
    })
    .join("");

  elements.habitRows.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => handleTableAction(button));
  });
}

function renderMetrics(weekDays) {
  const allWeekStats = state.habits.map((habit) => statsForWeek(habit, weekDays));
  const done = allWeekStats.reduce((total, stats) => total + stats.done, 0);
  const possible = allWeekStats.reduce((total, stats) => total + stats.total, 0);
  const bestStreak = Math.max(0, ...state.habits.map((habit) => longestStreak(habit.completions)));
  const averageRate = possible ? Math.round((done / possible) * 100) : 0;

  elements.metricDone.textContent = done;
  elements.metricStreak.textContent = bestStreak;
  elements.metricRate.textContent = `${averageRate}%`;
  elements.metricActive.textContent = state.habits.length;
  elements.metricDoneStats.textContent = done;
  elements.metricStreakStats.textContent = bestStreak;
  elements.metricRateStats.textContent = `${averageRate}%`;
  elements.homeEmpty.hidden = state.habits.length > 0;
}

function renderDetail(weekDays) {
  const selectedHabit = state.habits.find((habit) => habit.id === selectedHabitId) || state.habits[0];
  if (!selectedHabit) {
    elements.detail.innerHTML = `
      <section class="empty-panel inline-empty">
        <span class="empty-icon">${iconSvg("chart")}</span>
        <h2>Sem estatísticas por enquanto</h2>
        <p>As estatísticas aparecem depois que você cria hábitos e registra dias concluídos.</p>
      </section>
    `;
    return;
  }

  selectedHabitId = selectedHabit.id;
  const expanded = selectedHabit.id === state.expandedHabitId || !state.expandedHabitId;
  const allStats = lifetimeStats(selectedHabit);
  const weekStats = statsForWeek(selectedHabit, weekDays);
  const detailRows = state.habits
    .map((habit) => {
      const stats = lifetimeStats(habit);
      const isOpen = habit.id === selectedHabit.id;
      return `
        <article class="habit-card tone-${habit.color}">
          <div class="habit-card-header">
            <button class="habit-main row-select" data-action="select" data-id="${habit.id}" type="button">
              <span class="habit-avatar">${iconSvg(habit.icon)}</span>
              <span class="habit-title">
                <strong>${escapeHtml(habit.name)}</strong>
                <span>${escapeHtml(habit.category)}</span>
              </span>
            </button>
            <div class="mini-stat">
              <span class="metric-icon">${iconSvg("flame")}</span>
              <div><strong>${stats.currentStreak} dias</strong><span>sequência atual</span></div>
            </div>
            <div class="mini-stat">
              <span class="ring" style="--value: ${stats.completionRate}"></span>
              <div><strong>${stats.completionRate}%</strong><span>conclusão</span></div>
            </div>
            <div class="habit-actions">
              <button class="icon-button" data-action="edit" data-id="${habit.id}" type="button" aria-label="Editar ${escapeHtml(habit.name)}">${iconSvg("pencil")}</button>
              <button class="icon-button" data-action="expand" data-id="${habit.id}" type="button" aria-label="${isOpen ? "Recolher" : "Expandir"} ${escapeHtml(habit.name)}">${iconSvg(isOpen ? "chevron-up" : "chevron-down")}</button>
            </div>
          </div>
          ${isOpen && expanded ? expandedMarkup(habit, weekDays, weekStats, allStats) : ""}
        </article>
      `;
    })
    .join("");

  elements.detail.innerHTML = detailRows;
  elements.detail.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => handleTableAction(button));
  });
  state.selectedHabitId = selectedHabitId;
  persist();
}

function expandedMarkup(habit, weekDays, weekStats, allStats) {
  return `
    <div class="expanded">
      <div class="expanded-grid">
        <div>
          <strong>Progresso desta semana</strong>
          <div class="bar-chart" aria-label="Progresso semanal de ${escapeHtml(habit.name)}">
            ${weekDays
              .map((date) => {
                const done = habit.completions.includes(toDateKey(date));
                return `<span class="bar"><i style="height:${done ? 116 : 20}px; opacity:${done ? 1 : 0.28}"></i><span>${formatWeekday(date)}</span></span>`;
              })
              .join("")}
          </div>
        </div>
        <div>
          <strong>Estatísticas gerais</strong>
          <div class="stats-grid">
            <div class="stat-line"><span class="metric-icon">${iconSvg("calendar")}</span><div><strong>${allStats.longestStreak} dias</strong><span>maior sequência</span></div></div>
            <div class="stat-line"><span class="metric-icon">${iconSvg("target")}</span><div><strong>${allStats.completionRate}%</strong><span>taxa de conclusão</span></div></div>
            <div class="stat-line"><span class="metric-icon">${iconSvg("trend")}</span><div><strong>${allStats.done}/${allStats.total}</strong><span>concluídos</span></div></div>
            <div class="stat-line"><span class="metric-icon">${iconSvg("clock")}</span><div><strong>${daysSince(habit.startDate)} dias</strong><span>desde o início</span></div></div>
          </div>
        </div>
      </div>
      <p class="spotlight">${escapeHtml(habit.name)}: 🔥 ${allStats.currentStreak} dias consecutivos · 📈 ${allStats.completionRate}% de conclusão</p>
    </div>
  `;
}

function summaryMarkup(stats) {
  const warn = stats.completionRate < 60 ? " warn" : "";
  return `
    <span class="summary${warn}">
      <strong>${stats.done}/${stats.total}</strong>
      <span>${stats.completionRate}%</span>
      <span class="summary-bar"><i style="width:${stats.completionRate}%"></i></span>
    </span>
  `;
}

function handleTableAction(button) {
  const { action, id, date, tab } = button.dataset;
  if (action === "open-tab") {
    activateTab(tab);
    return;
  }
  if (action === "toggle") {
    toggleCompletion(id, date);
  }
  if (action === "select-home") {
    selectedHabitId = id;
    state.expandedHabitId = id;
    activateTab("stats");
  }
  if (action === "select") {
    selectedHabitId = id;
    state.expandedHabitId = id;
  }
  if (action === "expand") {
    selectedHabitId = id;
    state.expandedHabitId = state.expandedHabitId === id ? "" : id;
  }
  if (action === "edit") {
    openHabitForm(state.habits.find((habit) => habit.id === id));
    return;
  }
  persist();
  render();
}

function toggleCompletion(habitId, dateKey) {
  const habit = state.habits.find((item) => item.id === habitId);
  if (!habit) return;
  const completionSet = new Set(habit.completions);
  if (completionSet.has(dateKey)) {
    completionSet.delete(dateKey);
  } else {
    completionSet.add(dateKey);
  }
  habit.completions = [...completionSet].sort();
  selectedHabitId = habitId;
  state.expandedHabitId = habitId;
}

function openHabitForm(habit) {
  elements.form.reset();
  elements.habitId.value = habit?.id || "";
  elements.habitName.value = habit?.name || "";
  elements.habitCategory.value = habit?.category || "";
  elements.habitColor.value = habit?.color || "green";
  elements.formTitle.textContent = habit ? "Editar hábito" : "Novo hábito";
  elements.deleteHabit.hidden = !habit;
  elements.dialog.showModal();
  elements.habitName.focus();
}

function saveHabitFromForm() {
  const id = elements.habitId.value;
  const name = elements.habitName.value.trim();
  const category = elements.habitCategory.value.trim();
  const color = elements.habitColor.value;
  if (!name || !category) return;

  const payload = {
    name,
    category,
    color,
    icon: iconForName(name),
    startDate: toDateKey(today)
  };

  if (id) {
    state.habits = state.habits.map((habit) => (habit.id === id ? { ...habit, ...payload, startDate: habit.startDate } : habit));
    selectedHabitId = id;
    state.expandedHabitId = id;
  } else {
    const newHabit = { id: crypto.randomUUID(), completions: [], ...payload };
    state.habits.unshift(newHabit);
    selectedHabitId = newHabit.id;
    state.expandedHabitId = newHabit.id;
  }

  persist();
  elements.dialog.close();
  render();
}

function statsForWeek(habit, weekDays) {
  const availableDays = weekDays.filter((date) => date <= today);
  const total = Math.max(1, availableDays.length);
  const done = availableDays.filter((date) => habit.completions.includes(toDateKey(date))).length;
  return {
    done,
    total,
    completionRate: Math.round((done / total) * 100)
  };
}

function lifetimeStats(habit) {
  const total = Math.max(1, daysSince(habit.startDate));
  const done = habit.completions.filter((key) => new Date(`${key}T00:00:00`) <= today).length;
  return {
    done,
    total,
    currentStreak: currentStreak(habit.completions),
    longestStreak: longestStreak(habit.completions),
    completionRate: Math.round((done / total) * 100)
  };
}

function currentStreak(completions) {
  const completionSet = new Set(completions);
  let cursor = new Date(today);
  let streak = 0;
  while (completionSet.has(toDateKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

function longestStreak(completions) {
  const keys = [...new Set(completions)].sort();
  let longest = 0;
  let streak = 0;
  let previous = null;
  keys.forEach((key) => {
    const date = new Date(`${key}T00:00:00`);
    const continues = previous && toDateKey(addDays(previous, 1)) === key;
    streak = continues ? streak + 1 : 1;
    longest = Math.max(longest, streak);
    previous = date;
  });
  return longest;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && Array.isArray(saved.habits)) return saved;
  } catch {
    localStorage.removeItem(storageKey);
  }
  return {
    habits: [],
    selectedHabitId: "",
    expandedHabitId: ""
  };
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function iconSvg(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.target}</svg>`;
}

function iconForName(name) {
  const value = name.toLowerCase();
  if (value.includes("academ") || value.includes("trein")) return "dumbbell";
  if (value.includes("ler") || value.includes("livro")) return "book";
  if (value.includes("program") || value.includes("cod")) return "code";
  if (value.includes("água") || value.includes("agua")) return "droplet";
  if (value.includes("medit")) return "lotus";
  return "target";
}

function rangeDates(startKey, count) {
  const start = new Date(`${startKey}T00:00:00`);
  return Array.from({ length: count }, (_, index) => toDateKey(addDays(start, index)));
}

function makeHistory(dayCount, doneCount, currentStreakLength) {
  const keys = [];
  for (let offset = currentStreakLength - 1; offset >= 0; offset -= 1) {
    keys.push(toDateKey(addDays(today, -offset)));
  }

  const remaining = doneCount - keys.length;
  const start = addDays(today, -(dayCount - 1));
  for (let index = 0; index < dayCount - currentStreakLength && keys.length < doneCount; index += 1) {
    const candidate = addDays(start, index);
    if ((index + 1) % 10 !== 0) keys.push(toDateKey(candidate));
  }

  while (keys.length < doneCount) {
    keys.push(toDateKey(addDays(start, remaining - keys.length)));
  }

  return uniqueDates(keys);
}

function uniqueDates(keys) {
  return [...new Set(keys)].sort();
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfWeek(date) {
  const day = date.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  return addDays(startOfDay(date), mondayOffset);
}

function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function daysSince(dateKey) {
  const start = new Date(`${dateKey}T00:00:00`);
  return Math.max(1, Math.floor((today - start) / 86400000) + 1);
}

function isSameDay(left, right) {
  return toDateKey(left) === toDateKey(right);
}

function formatWeekday(date) {
  return new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(date).replace(".", "");
}

function formatFullDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function weekRangeLabel(days) {
  const formatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });
  return `${formatter.format(days[0])} - ${formatter.format(days[6])}`;
}

function periodGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia ☀️ Vamos começar com intenção.";
  if (hour < 18) return "Boa tarde 🍃 Ainda dá para avançar hoje.";
  return "Boa noite 🌙 Hora de fechar o dia com constância.";
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}
