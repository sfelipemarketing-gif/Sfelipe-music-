# Motion pessoal

Você manda sua explicação. O assistente cria as cenas e animações. Você baixa
o vídeo pronto. Este projeto é o motor de produção, sem aplicativo ou editor.

## O que está preparado

- Cenas em React + TypeScript + Remotion, com SVG, tipografia cinética,
  curvas de movimento, conexões, fluxo, formas e gráficos com dados explícitos.
- Uma composição compartilhada entre prévia e renderização, sem rede externa
  durante o desenho das cenas. A fonte DM Sans é instalada junto ao projeto.
- Projetos em JSON: conteúdo, cores, cenas, tempos e referência ao áudio local.
- MP4 H.264, áudio AAC, pixels yuv420p, fast-start para Safari/iPhone.
- 1920×1080, 1080×1920 e 1080×1080, a 30 quadros por segundo.
- Verificação automática de duração, áudio, resolução e codecs com FFprobe.
- Workflow de GitHub Actions para gerar e baixar o MP4.

O exemplo tem 12 segundos e som sintético original, sem narração. Serve para
validar o motor. O primeiro vídeo de verdade será criado para o assunto do
áudio que o usuário ainda vai enviar. A qualidade artística deve ser ajustada
à explicação; não há promessa de qualidade cinematográfica automática.

## Baixar pelo GitHub

Abra **Actions → Motion pessoal — gerar MP4 → execução concluída**. Na parte
**Artifacts**, toque no arquivo `motion-pessoal-N`. Extraia o ZIP e abra
`motion.mp4`. O arquivo fica disponível por **3 dias**, depois deve ser gerado
novamente. No iPhone, use Safari/Arquivos; a compatibilidade real no aparelho
ainda precisa ser confirmada pelo usuário.

O workflow roda quando o assistente atualiza `motion/` na branch `motion-pessoal`.
`workflow_dispatch` só aparece na interface depois que o workflow está na branch
padrão, conforme a regra do GitHub; esta preparação preserva `main`.

## Executar tecnicamente

Node.js 22+, FFmpeg/FFprobe e Chrome/Chromium. O renderer pode baixar o navegador
se não houver uma instalação local. `MOTION_CHROME` permite indicar o executável.

```sh
cd motion
npm ci
npm run check
npm test
npm run demo:audio
npm run render
npm run verify
npm run still
```

Saídas em `out/`. Variantes:

```sh
npm run render -- --format 9:16
npm run render -- --format 1:1
npm run render -- --project projects/meu-video.json
npm run still -- --format 9:16 --frame 65 --scale 0.5
```

Para um áudio autorizado, o assistente coloca o arquivo em `public/`, define
`audio` no projeto e ajusta as durações em quadros. Também atualiza `MOTION_PROJECT`
no workflow para selecionar esse JSON (o padrão é `projects/demo.json`). O render falha se o áudio
e a linha do tempo diferirem mais de 250 ms, evitando cortar a explicação.
Os arquivos usuais de narração são ignorados pelo Git para evitar envio acidental.
Publicar mídia exige escolha consciente: este repositório é público.

## Custos e limites

- Uso pessoal do Remotion está coberto pela licença gratuita consultada.
- Sem APIs de IA, serviços externos de voz ou recursos pagos de renderização.
- Runner padrão em repositório público. Não usar runners maiores, que são pagos.
- O workflow não executa em repositório privado; não há saldo de cobrança
  acessível pelo assistente. O modelo gratuito deve ser reavaliado se mudar a visibilidade.
- Retenção de 3 dias e nenhum cache de dependências no Actions.
- Limite inicial de 3 minutos e timeout de 25 minutos no Actions; vídeos complexos
  podem exceder esse tempo e precisam de ajuste. Não há garantia de render ilimitado.
- Sem transcrição automática instalada nesta versão. O assistente deve confirmar
  que consegue acessar/transcrever o áudio recebido antes de afirmar que o analisou.
- 4K, geração de imagens/vídeos, edição visual e automação semântica ficam fora.

## Para continuar de outra conversa

Leia [CONTEXTO.md](CONTEXTO.md), [STATUS.md](STATUS.md) e [AGENTS.md](AGENTS.md).
Não existe garantia de lembrança automática entre chats. O registro no GitHub
permite recuperar decisões e trabalho sem recomeçar.

Fontes conferidas na preparação:
[licença Remotion](https://www.remotion.dev/docs/license/pricing) e
[gratuidade e cobrança do GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions).
