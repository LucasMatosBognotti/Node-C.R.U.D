import app from './app';

app.listen(process.env.PORT, () => console.log(`O servidor esta rodando na porta ${process.env.PORT}`));