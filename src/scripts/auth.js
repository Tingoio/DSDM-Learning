// src/scripts/auth.js
$(document).ready(function () {
  const API_URL = "http://localhost:5008/api";

  // Verificar sessão
  function checkAuth() {
    return $.ajax({
      url: `${API_URL}/Auth/check-session`,
      type: "GET",
      xhrFields: {
        withCredentials: true,
      },
    });
  }

  // Logout
  function logout() {
    // Limpar localStorage
    localStorage.removeItem("userInfo");

    $.ajax({
      url: `${API_URL}/Auth/logout`,
      type: "POST",
      xhrFields: {
        withCredentials: true,
      },
      success: function () {
        window.location.href = "login.html";
      },
      error: function () {
        // Mesmo se a requisição falhar, redirecionar para login
        window.location.href = "login.html";
      },
    });
  }

  // Atualizar informações do usuário no cabeçalho
  function updateUserInfo(user) {
    if (user) {
      const initials = user.username.charAt(0);
      $("#user-info")
        .html(
          `
      <div class="user-avatar">${initials}</div>
      <div class="user-greeting">
        <span class="greeting-text">Olá,</span>
        <span class="username">${user.username}</span>
      </div>
      <button id="logout-btn" class="logout-btn" title="Sair">
        <i class="fas fa-sign-out-alt"></i>
        <span>Sair</span>
      </button>
    `
        )
        .show();

      // Adicionar evento de logout
      $("#logout-btn").click(function () {
        logout();
      });
    }
  }

  // Verificar se está em uma página protegida
  const protectedPages = [
    "aprendizagem.html",
    "quizzes.html",
    "materiaisEducativos.html",
    "estudoDeCaso.html",
  ];
  const currentPage = window.location.pathname.split("/").pop();

  // Tentar obter informações do usuário do localStorage
  const storedUserInfo = localStorage.getItem("userInfo");
  let localUser = null;

  if (storedUserInfo) {
    try {
      localUser = JSON.parse(storedUserInfo);
    } catch (e) {
      console.error(
        "Erro ao analisar informações do usuário do localStorage",
        e
      );
    }
  }

  checkAuth()
    .done(function (response) {
      if (response.success) {
        // Sessão válida no servidor
        updateUserInfo(response.user);

        // Atualizar localStorage com dados mais recentes
        localStorage.setItem("userInfo", JSON.stringify(response.user));

        // Chamar callback se existir
        if (typeof window.onAuthStateChanged === "function") {
          window.onAuthStateChanged(true, response.user);
        }
      } else if (localUser) {
        // Sessão inválida no servidor, mas temos dados no localStorage
        // Tentar reautenticar silenciosamente (opcional)
        console.log("Sessão expirada, usando dados do localStorage");
        updateUserInfo(localUser);

        // Chamar callback se existir
        if (typeof window.onAuthStateChanged === "function") {
          window.onAuthStateChanged(true, localUser);
        }
      } else {
        // Não autenticado
        if (protectedPages.includes(currentPage)) {
          window.location.href = "login.html";
        }

        // Chamar callback se existir
        if (typeof window.onAuthStateChanged === "function") {
          window.onAuthStateChanged(false);
        }
      }
    })
    .fail(function () {
      // Falha na verificação
      if (localUser) {
        // Usar dados do localStorage como fallback
        console.log(
          "Falha na verificação de sessão, usando dados do localStorage"
        );
        updateUserInfo(localUser);

        // Chamar callback se existir
        if (typeof window.onAuthStateChanged === "function") {
          window.onAuthStateChanged(true, localUser);
        }
      } else if (protectedPages.includes(currentPage)) {
        window.location.href = "login.html";
      }
    });

  // Expor funções globalmente
  window.auth = {
    logout: logout,
    checkAuth: checkAuth,
  };
});
