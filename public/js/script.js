const urlParams = new URLSearchParams(window.location.search);
const mensagem = urlParams.get('mensagem');

if (mensagem) {
    alert(decodeURIComponent(mensagem));
}

document.addEventListener('DOMContentLoaded', async () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e)=> {
        
        e.preventDefault();
        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;

        const data = {
            user,
            password
        };
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                window.location.href = '/home';
            } else if (response.status === 401){
                alert('Senha incorreta!');
            } else if (response.status === 400){
                alert('Usuário não encontrado!');
            } else {
                alert('Erro ao realizar login!');
            }
        }catch(error){
            console.error('Erro ao realizar login!', error);
        }
    });

    const cadastroForm = document.getElementById('cadastroForm');
    cadastroForm.addEventListener('submit', async (e)=> {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;

        const data = {
            username,
            user,
            password
        };
        try {
            const response = await fetch('/api/cadastro', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert('Cadastro realizado com sucesso!');
                window.location.href = '/';
            } else {
                alert('Usuário já cadastrado!');
            }
        }catch(error){
            console.error('Erro ao realizar cadastro!', error);
        }
    });

    const ticketForm = document.getElementById('ticketForm');
    ticketForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const ticketTitle = document.getElementById('ticketTitle').value;
        const ticketCategory = document.getElementById('ticketCategory').value;
        const ticketDescription = document.getElementById('ticketDescription').value;

        const data = {
            ticketTitle,
            ticketCategory,
            ticketDescription
        };
        try {
            const response = await fetch('/api/ticketCreate', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert('Ticket cadastrado com sucesso!');
                window.location.href = '/home';
            } else {
                alert('Erro ao cadastrar ticket!');
            }
        } catch (error) {
            console.error('Erro ao cadastrar ticket!', error);
        }
    });

    const categoryForm = document.getElementById('categoryForm');
    categoryForm.addEventListener('submit', async (e)=> {
        e.preventDefault();

        const categoryName = document.getElementById('categoryName').value;

        const data = {
            categoryName
        };
        try {
            const response = await fetch('/api/categoryCreate', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert('Categoria cadastrada com sucesso!');
                window.location.href = '/home';
            } else {
                alert('Categoria já existe!');
            }
        }catch(error){
            console.error('Erro ao cadastrar categoria!', error);
        }
    });

    const techAssignForm = document.getElementById('techAssignForm');
    techAssignForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const techId = document.getElementById('userSelect').value;
        if (techId === ""){
            alert('Selecione um usuário!');
        }

        const data = {
            techId
        };

        try {
            const response = await fetch('/api/techAssign', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert('Técnico cadastrado com sucesso!');
                window.location.href = '/home';
            } else {
                alert('Erro ao cadastrar técnico!');
            }
        } catch (error) {
            console.error('Erro ao cadastrar técnico!', error);
        }
    });
});
