# SFelipe Music

## [▶ OUVIR AGORA — ABRIR SFELIPE MUSIC](https://sfelipemarketing-gif.github.io/Sfelipe-music-/)

**O site está publicado.** Toque no link acima para abrir o player. **Where the Road Ends** e **Running to you**, de SFelipe, já estão no catálogo. As três faixas marcadas como demonstração continuam disponíveis como exemplos de teste.

Primeira versão de um site exclusivo para as músicas autorais de **SFelipe**, identificador **SFelipeOficial**. HTML, CSS e JavaScript puro. Gratuito para ouvir, sem conta, cadastro ou assinatura.

**Catálogo com música real e demonstrações identificadas.** Where the Road Ends (aproximadamente 3min53s) e Running to you (3min32s) foram enviadas pelo artista. Os áudios foram preservados e as capas originais foram extraídas dos próprios MP3. A data no catálogo é a de inclusão no site (31/10/2026); a data original de lançamento não foi informada. Os outros três MP3 são instrumentais sintéticos de teste, com títulos e capas fictícios. Apenas essas faixas ficam marcadas como demonstração.

## Seu projeto no GitHub

Os arquivos desta versão foram preparados para o repositório [sfelipemarketing-gif/Sfelipe-music-](https://github.com/sfelipemarketing-gif/Sfelipe-music-), na branch `main`. A integração com o GitHub foi utilizada para enviar os arquivos. **O GitHub Pages foi ativado pelo proprietário; a publicação foi concluída e o endereço público respondeu HTTP 200.**

Os passos 1 a 3 deste guia manual já foram resolvidos pelo envio direto. Para revisar, abra a [prévia de celular](docs/previa-iphone.png), a [prévia de computador](docs/previa-desktop.png) e o [registro de testes](docs/TESTES.md). São imagens de referência; a prévia não é um player interativo.

O endereço ativo é **https://sfelipemarketing-gif.github.io/Sfelipe-music-/**. A configuração utilizada é **Settings → Pages → Deploy from a branch → main → / (root)**. A seção 5 fica como referência para futuras configurações.

## O que já funciona

- Biblioteca, destaque das três faixas mais recentes e capas grandes.
- Player fixo com reproduzir, pausar, faixa anterior, próxima, progresso e duração.
- Avanço automático até a última faixa; a reprodução termina ao fim da biblioteca.
- Volume nos navegadores compatíveis. No iPhone, use os botões físicos ou a Central de Controle.
- Links individuais para compartilhar músicas. O destinatário abre a faixa selecionada e toca em Reproduzir.
- Integração com Media Session, quando disponível, para controles do aparelho.
- Layout para celular e computador, navegação por teclado e respeito à preferência de movimento reduzido.

Não há banco de dados, serviços externos, rastreamento, login, comentários, curtidas, contadores de reprodução, pagamentos, modo offline ou botões de download.

## 1. Primeiro: onde colocar os arquivos no iPhone

Você vai usar três coisas: **Arquivos**, **Safari** e sua conta do **GitHub**.

1. Baixe o ZIP que acompanha esta entrega. Se estiver usando o app do ChatGPT, toque no arquivo e use Compartilhar → Salvar em Arquivos, quando essa opção aparecer.
2. Abra **Arquivos → Downloads** (ou a pasta onde salvou). Toque uma vez em `sfelipe-music.zip` para descompactar.
3. Entre na pasta `sfelipe-music`. Lá estão `index.html`, `README.md`, `css`, `js` e `assets`.
4. Guarde essa pasta. Ela é a cópia dos arquivos do site.

**Já baixou o app do GitHub?** Pode continuar com ele instalado. Para criar pastas, enviar os arquivos e configurar Pages, siga este guia em **github.com pelo Safari**. Essas opções podem não estar disponíveis no aplicativo. Se faltar algum menu no Safari, toque no menu da página ao lado do endereço e escolha **Solicitar Site para Computador**. Os nomes podem aparecer em inglês.

## 2. Criar sua conta e seu repositório

Não é necessário conectar o GitHub ao ChatGPT para fazer a publicação manual.

1. No Safari, abra <https://github.com>. Toque em **Sign up** para criar uma conta ou **Sign in** para entrar.
2. Confirme seu e-mail se estiver criando a conta.
3. Abra <https://github.com/new> depois de entrar.
4. Em **Repository name**, escreva `sfelipe-music`.
5. Selecione **Public**. O GitHub Pages está disponível gratuitamente para repositórios públicos no plano gratuito.
6. Marque **Add a README file**. Não adicione licença agora: escolher uma licença para suas músicas exige uma decisão sua.
7. Toque em **Create repository**.

O repositório é a pasta do projeto dentro do GitHub. Ele ficará em `https://github.com/SEU-USUARIO/sfelipe-music`.

### Se quiser conectar o GitHub ao ChatGPT depois

Procure GitHub na área de Apps/Conectores do ChatGPT, se estiver disponível na sua conta, conecte a conta correta e autorize apenas o repositório desejado. A conexão e a possibilidade de editar arquivos variam conforme a ferramenta e as permissões. Nunca envie sua senha ou token no chat. A primeira entrega foi preparada localmente; depois, a integração foi conectada e os arquivos foram enviados diretamente ao seu repositório, sem ativar Pages.

## 3. Enviar os arquivos pelo Safari

**Não envie o ZIP como arquivo único:** Pages precisa de `index.html` e dos demais arquivos descompactados. Também não envie a pasta `sfelipe-music` dentro de outra pasta do repositório: `index.html` deve ficar na raiz.

### Arquivos da raiz

1. Abra o repositório na aba **Code**.
2. Toque em **Add file → Upload files**. Se necessário, procure o botão no menu `…` ou use a versão para computador.
3. Toque em **choose your files**, escolha **Choose Files/Escolher Arquivos** e abra a pasta descompactada.
4. Selecione **index.html** e **README.md**. No seletor do iPhone, use `… → Selecionar`, quando disponível, para escolher mais de um arquivo. Você também pode enviar um por vez.
5. Aguarde o envio. Em **Commit changes**, escreva `Adicionar primeira versão do SFelipe Music` e confirme **Commit changes**. Se substituir o README inicial, confirme a alteração.

### Pastas do site

O seletor de arquivos do iPhone pode não enviar pastas inteiras. Nesse caso, crie cada pasta no GitHub e envie seu conteúdo assim:

1. Na raiz do repositório, toque em **Add file → Create new file**.
2. No nome, digite `css/.gitkeep`. A barra `/` cria a pasta. No conteúdo, escreva `Pasta de estilos`.
3. Toque em **Commit changes** e confirme. Abra a pasta `css` que apareceu.
4. Dentro dela, escolha **Add file → Upload files**, selecione `styles.css` da pasta `css` no app Arquivos e confirme o commit.
5. Repita o mesmo processo para os destinos abaixo. **Comece na raiz do repositório ao criar cada destino**, evitando pastas dentro de pastas erradas.

| Destino no GitHub | Nome a usar em Create new file | Arquivos a enviar depois, dentro desse destino |
| --- | --- | --- |
| `css` | `css/.gitkeep` | `styles.css` |
| `js` | `js/.gitkeep` | `musicas.js` e `app.js` |
| `assets` | `assets/.gitkeep` | `icone.svg` |
| `assets/capas` | `assets/capas/.gitkeep` | Todos os arquivos da pasta local `assets/capas` |
| `assets/audio` | `assets/audio/.gitkeep` | Os três arquivos `.mp3` da pasta local `assets/audio` |

Os arquivos `.gitkeep` são apenas marcadores para criar as pastas. Pode deixá-los lá. Não afetam o site. A pasta `tools` contém apenas um gerador opcional dos áudios de teste; **não precisa enviá-la**. Não é necessário usar terminal, instalar programas ou executar Python no iPhone.

Confira se ficou assim, respeitando letras minúsculas e nomes dos arquivos:

```text
sfelipe-music/              ← repositório; não é uma subpasta no GitHub
├── index.html              ← precisa estar aqui na raiz
├── README.md
├── css/
│   └── styles.css
├── js/
│   ├── musicas.js          ← catálogo que você vai editar
│   └── app.js
└── assets/
    ├── icone.svg
    ├── capas/
    │   ├── entre-frequencias.png
    │   ├── horizonte-azul.png
    │   ├── depois-da-meia-noite.png
    │   ├── padrao.svg
    │   └── ...             ← fontes SVG das capas também podem ficar aqui
    └── audio/
        ├── entre-frequencias-demo.mp3
        ├── horizonte-azul-demo.mp3
        └── depois-da-meia-noite-demo.mp3
```

## 4. Testar antes de publicar

**O site foi publicado pelo proprietário após a revisão da primeira versão.** A entrega inclui imagens da interface e o registro dos testes. Agora é possível testar o player diretamente no endereço público do início deste README.

No iPhone, a prévia de um HTML no app Arquivos geralmente **não executa o site completo**, e o GitHub mostra o código dos arquivos. Isso não significa que o site está quebrado. Para testar interativamente pelo iPhone, será preciso abrir uma prévia web fornecida pelo ambiente de desenvolvimento, se houver, ou habilitar Pages após revisar esta entrega. Habilitar Pages torna o site público: faça isso somente quando quiser publicar. Não é preciso contratar ou autorizar outro serviço.

Com um computador, há também a opção local, sem publicação e sem instalar dependências:

```sh
cd sfelipe-music
python3 -m http.server 8000
```

Abra `http://localhost:8000` no navegador desse computador. Esse comando é opcional e **não é uma etapa para o iPhone**. Você também pode abrir `index.html` em um navegador de computador; compartilhamento e Media Session funcionam melhor em HTTP local ou HTTPS.

Observação para o teste local: o servidor simples do Python pode não aceitar pedidos de trechos do áudio (HTTP Range). Nesse caso, arrastar a barra pode não funcionar nesse servidor. O teste completo da barra foi feito com um servidor local que aceita esses pedidos, como o GitHub Pages. Não é necessário adicionar um servidor ao site publicado.

### Checklist quando estiver com o site aberto

1. Veja o aviso de demonstração e as três capas.
2. Toque em **Ouvir lançamento**: o áudio deve começar somente após esse toque.
3. Pause e retome. Verifique se o tempo anda e se a barra acompanha.
4. Arraste a barra para aproximadamente a metade da faixa.
5. Teste próxima e anterior. Na primeira faixa, Anterior fica desativado; na última, Próxima fica desativado.
6. Toque em uma capa ou no título de uma faixa na biblioteca. O player deve mudar sem sobrepor dois áudios.
7. Deixe uma faixa terminar: deve ir para a próxima. Ao terminar a última, o áudio para.
8. Compartilhe uma faixa e abra o link em outra aba. Ela deve aparecer selecionada, **sem tocar automaticamente**.
9. No iPhone, teste volume pelos botões físicos. No computador compatível, use o controle de volume do site.
10. Inicie o áudio, mude de aplicativo ou bloqueie a tela e confira os controles de mídia. **Reprodução em segundo plano, avanço entre faixas com a tela bloqueada e controles dependem do Safari, da versão do iOS e do estado do aparelho. Não são garantidos.** Não é necessário manter a tela ativa por código.

## 5. Publicar gratuitamente no GitHub Pages — quando você decidir

1. Depois de revisar e enviar os arquivos, abra seu repositório no **Safari**.
2. Entre em **Settings → Pages**. Use o menu horizontal ou a versão para computador se Settings estiver escondido.
3. Em **Build and deployment**, escolha **Source: Deploy from a branch**.
4. Em **Branch**, selecione **main** e **/ (root)**.
5. Toque em **Save**. Aguarde alguns minutos e recarregue a página.
6. O GitHub informará o endereço do site. Normalmente será `https://sfelipemarketing-gif.github.io/Sfelipe-music-/`.
7. Abra esse endereço e faça o checklist da seção anterior. Se o envio ou a publicação falhar, confira a aba **Actions** do repositório.

Os caminhos dos arquivos são relativos: funcionam também com `/sfelipe-music/` no endereço do Pages. Não é preciso domínio próprio, cartão de crédito ou GitHub Actions personalizado.

## 6. Trocar as demonstrações pelas suas músicas

### Enviar o MP3 e a capa

1. No repositório, entre em **assets → audio → Add file → Upload files** e envie o seu MP3.
2. Entre em **assets → capas** e envie a capa. Prefira JPG ou PNG quadrado de 600 × 600 ou 1000 × 1000 pixels, comprimido.
3. Use nomes simples, como `minha-musica.mp3` e `minha-musica.jpg`, sem espaços ou acentos. Não renomeie um áudio de outro formato para `.mp3`: ele precisa ser um MP3 de verdade.

### Editar o catálogo pelo iPhone

1. Abra **js → musicas.js** no GitHub pelo Safari.
2. Toque no lápis (**Edit this file**, às vezes dentro do menu `…`).
3. Substitua um bloco de demonstração por um como este:

```js
  {
    id: "minha-musica",
    title: "Minha música",
    artist: "SFelipe",
    releaseDate: "2026-11-01",
    duration: 210,
    audio: "assets/audio/minha-musica.mp3",
    cover: "assets/capas/minha-musica.jpg",
    demo: false
  }
```

- `id`: identificador exclusivo e estável para o link. Não repita e evite mudá-lo depois de compartilhar.
- `title`: título que o público vê; pode ter acentos.
- `artist`: nome artístico.
- `releaseDate`: data no formato `AAAA-MM-DD`; o site ordena da mais recente para a mais antiga. Use apenas faixas prontas para ficar públicas: uma data futura **não** agenda nem oculta um lançamento.
- `duration`: duração em segundos; 3min30s = 210. Ao carregar, o player usa a duração real do MP3.
- `audio` e `cover`: caminhos iguais aos arquivos enviados, inclusive maiúsculas e extensão.
- `demo: false`: identifica sua música real.

4. Para adicionar mais faixas, copie um bloco inteiro. Coloque **vírgula entre os blocos** e mantenha `window.SFELIPE_TRACKS = [` no começo e `];` no fim. Não apague as aspas dos textos.
5. Confirme em **Commit changes**. Se Pages estiver ativo, o GitHub atualizará o site após alguns minutos.
6. Remova os blocos fictícios quando não precisar deles. O aviso de demonstração some sozinho quando todas as faixas do catálogo tiverem `demo: false`. Não precisa editar o player nem o HTML.
7. Após remover os blocos, você pode apagar os respectivos MP3 de demonstração para liberar espaço. Se quiser retirar uma música real, remova o bloco do catálogo e também os arquivos que não devem mais estar acessíveis.

## 7. Armazenamento, tráfego e privacidade

- Esta versão usa somente arquivos do seu repositório. Nenhum áudio é enviado a terceiros. O navegador carrega os metadados da faixa selecionada e não pré-carrega a biblioteca inteira.
- Um MP3 de 4 minutos a 128 kbps tem aproximadamente **3,8 MB**; a 192 kbps, cerca de **5,8 MB**. Prefira 128–192 kbps e capas comprimidas. Não envie WAV ou arquivos sem compressão para este site.
- O envio pelo navegador do GitHub aceita arquivos de até **25 MiB por arquivo**. O GitHub bloqueia arquivos comuns acima de **100 MiB**. O Git LFS não é uma solução para hospedar mídia no Pages.
- A documentação do Pages informa limite de **1 GB para o site publicado**, limite flexível de **100 GB de tráfego por mês** e **10 compilações por hora** para o fluxo padrão. Os limites podem mudar: consulte a documentação oficial antes de ampliar a biblioteca.
- Como exemplo, 100 GB representam aproximadamente 25 mil transferências de arquivos de 4 MB. Isso não é uma promessa de quantidade de ouvintes: repetição, capas, cache e transferências parciais mudam o consumo.
- Se o catálogo ou a audiência crescer, acompanhe o tamanho dos arquivos e as mensagens do GitHub. Não há migração automática, cobrança programada ou hospedagem externa configurada aqui.
- Repositório público e áudio público podem ser acessados e copiados por quem souber os endereços. **A ausência de um botão de download não impede salvar o áudio.** Não envie materiais privados. Apagar um arquivo depois não elimina cópias nem seu histórico Git.
- A gratuidade do acesso não concede automaticamente uma licença de reutilização das suas músicas. Nenhuma licença aberta para o seu catálogo foi adicionada.

Referências oficiais:

- [Criar um site GitHub Pages](https://docs.github.com/pt/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configurar a origem de publicação](https://docs.github.com/pt/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Limites do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Enviar arquivos pelo navegador](https://docs.github.com/pt/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)

## Se algo não funcionar

| Sintoma | O que conferir |
| --- | --- |
| Página 404 | Aguarde a publicação; confirme `main`, `/ (root)` e `index.html` na raiz. |
| Site sem cores ou biblioteca vazia | Confira as pastas `css` e `js`, os nomes e as vírgulas do catálogo. |
| Capa não aparece | Confira o caminho da imagem e a extensão; a capa padrão entra como reserva. |
| Música não toca | Toque em Reproduzir; confira o MP3, seu caminho e a conexão. Tente outra faixa. |
| Mudanças não aparecem | Aguarde a conclusão em Actions e recarregue o Safari. |
| Volume do site não aparece no iPhone | É esperado; use o volume do próprio aparelho. |
| Áudio para ao sair do Safari | O sistema pode suspender o áudio; retome pelos controles do aparelho ou volte ao Safari. |

## Estrutura técnica

`index.html` é a página; `css/styles.css` define o visual; `js/musicas.js` é o catálogo; `js/app.js` controla o áudio, os links e a interface. Não há instalação, build, chaves de API ou backend. `tools/gerar_demos.py` é opcional e recria apenas as demonstrações com Python e FFmpeg; não faz parte do funcionamento do site.
