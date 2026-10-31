# SFelipe Music

## [▶ OUVIR AGORA](https://sfelipemarketing-gif.github.io/Sfelipe-music-/)

Site exclusivo das músicas autorais de **SFelipe**, identificador **SFelipeOficial**. Acesso gratuito, sem conta, cadastro ou assinatura. HTML, CSS e JavaScript puro, publicado no GitHub Pages.

## Biblioteca atual

| Música | Duração aproximada |
| --- | --- |
| [You Don’t Even Know](https://sfelipemarketing-gif.github.io/Sfelipe-music-/?faixa=you-dont-even-know) | 5:18 |
| [Keep my people close](https://sfelipemarketing-gif.github.io/Sfelipe-music-/?faixa=keep-my-people-close) | 5:34 |
| [Running to you](https://sfelipemarketing-gif.github.io/Sfelipe-music-/?faixa=running-to-you) | 3:32 |
| [Where the Road Ends](https://sfelipemarketing-gif.github.io/Sfelipe-music-/?faixa=where-the-road-ends) | 3:53 |

**As três faixas de teste foram removidas.** Entre frequências, Horizonte azul e Depois da meia-noite não fazem mais parte da biblioteca nem dos arquivos atuais do site. Suas capas e o gerador dos áudios de demonstração também foram retirados. O histórico Git mantém as versões anteriores.

Os quatro MP3 reais foram preservados, com capas extraídas dos próprios arquivos. As datas do catálogo representam a inclusão no site; as datas originais de lançamento não foram informadas.

## Testar pelo iPhone

1. Abra o link OUVIR AGORA no **Safari**. A página dos arquivos no GitHub não é o player.
2. Toque em **Ouvir lançamento** ou em uma capa. Não há autoplay ao abrir o site.
3. Teste pausar, retomar, próxima, anterior e arrastar a barra de progresso.
4. Confira as quatro músicas na biblioteca e a ausência de aviso de demonstração.
5. Compartilhe uma faixa e abra o link em outra aba. Ela deve ficar selecionada sem tocar automaticamente.
6. Use os botões físicos ou a Central de Controle para o volume no iPhone.
7. Para testar segundo plano, inicie o áudio e bloqueie a tela ou mude de aplicativo. Esse funcionamento e os controles de mídia dependem do Safari e do iOS; não são garantidos.

Se ainda aparecer conteúdo antigo, recarregue a página ou feche a aba e abra novamente.

[Prévia de celular](docs/previa-iphone.png) · [Prévia de computador](docs/previa-desktop.png) · [Registro de testes](docs/TESTES.md)

## Adicionar uma música

Você pode enviar o MP3, título e capa na conversa em que este projeto foi criado para inclusão com o acesso autorizado ao repositório. A imagem embutida no MP3 pode ser aproveitada como capa.

Para fazer manualmente pelo iPhone, use **github.com no Safari**. Algumas opções não aparecem no app do GitHub. Se necessário, solicite a versão para computador no menu do Safari.

1. Abra [este repositório](https://github.com/sfelipemarketing-gif/Sfelipe-music-).
2. Entre em **assets → audio → Add file → Upload files**, escolha o MP3 no app Arquivos e confirme **Commit changes**.
3. Entre em **assets → capas** e envie uma capa JPG ou PNG quadrada pelo mesmo processo.
4. Abra **js → musicas.js**, toque no lápis (**Edit this file**) e adicione um bloco à lista:

```js
  {
    id: "minha-nova-musica",
    title: "Minha nova música",
    artist: "SFelipe",
    releaseDate: "2026-11-01",
    duration: 210,
    audio: "assets/audio/minha-nova-musica.mp3",
    cover: "assets/capas/minha-nova-musica.jpg",
    demo: false
  }
```

5. Separe os blocos com **vírgula**, mantenha `window.SFELIPE_TRACKS = [` no começo e `];` no final. Confirme **Commit changes**.
6. Aguarde a atualização na aba **Actions** e teste o site.

Use um `id` exclusivo e estável, sem espaços nem acentos; não o altere depois de compartilhar o link. Os títulos podem ter acentos. Os caminhos precisam coincidir com os arquivos enviados, inclusive maiúsculas e extensões.

`releaseDate` usa `AAAA-MM-DD` e ordena da mais recente para a mais antiga. Em datas iguais, vale a ordem da lista. Uma data futura não agenda nem oculta a faixa. `duration` usa segundos (3min30s = 210); o player atualiza pela duração real do MP3. Use `demo: false` nas músicas reais.

Para remover uma faixa, retire o bloco do catálogo e apague o MP3 e a capa se não forem usados por outra música.

## Publicação e arquivos

O Pages já está ativo em **Settings → Pages → Deploy from a branch → main → / (root)**. Novos commits em `main` atualizam o site. Aguarde alguns minutos e confira **Actions** se a mudança não aparecer.

- `index.html`: página principal.
- `css/styles.css`: visual responsivo.
- `js/musicas.js`: catálogo que você edita.
- `js/app.js`: player, compartilhamento e controles de mídia.
- `assets/audio`: MP3 reais.
- `assets/capas`: capas reais e imagem padrão de reserva.
- `docs`: prévias e testes.

Não é necessário instalar programas, usar terminal, executar um build ou configurar chaves. Não há banco de dados, hospedagem externa de áudio, login, pagamentos, comentários, curtidas, contadores de reprodução, modo offline ou botões de download.

## Armazenamento e tráfego

Prefira MP3 de 128–192 kbps e capas comprimidas. Não envie WAV nem apenas renomeie outro formato para `.mp3`. O navegador não pré-carrega toda a biblioteca.

- O envio pelo navegador aceita até **25 MiB por arquivo**. O GitHub bloqueia arquivos comuns acima de **100 MiB**. Git LFS não é uma solução para hospedar mídia no Pages.
- A documentação do Pages informa **1 GB para o site publicado**, limite flexível de **100 GB de tráfego por mês** e **10 compilações por hora** no fluxo padrão. Esses limites podem mudar.
- Um MP3 de quatro minutos a 128 kbps tem cerca de 3,8 MB; a 192 kbps, cerca de 5,8 MB. Repetições, imagens, cache e transferências parciais influenciam o tráfego.
- Arquivos públicos podem ser acessados e copiados. A ausência de botão de download não impede salvar o áudio. Apagar um arquivo não remove cópias nem o histórico Git.
- Não foi adicionada licença aberta para reutilização das músicas nem migração para hospedagem externa.

Referências: [configurar publicação](https://docs.github.com/pt/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [limites do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) e [enviar arquivos](https://docs.github.com/pt/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).
