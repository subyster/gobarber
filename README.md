Serviços da Aplicação:

# Recuperação de senha

**RF**

- Usuário deve poder recuperar a senha ao informar seu e-mail;
- Usuário deve receber um e-mail com instruções de recuperação de senha;
- Usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para resetar senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao criá-la;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu perfil;

**RN**

- O usuário não pode alterar seu email para um email já cadastrado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia atual devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real pelo Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida controlado pelo prestador;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias com horários disponíveis de cada prestador;
- O usuário deve poder listar os hoários disponíveis em um dia específico;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar uma hora;
- Os agendamentos devem ser feitos com horário de início entre 8h e 17h;
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
