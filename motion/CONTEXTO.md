# Contexto durável — motion pessoal

Atualizado em 9 de novembro de 2026.

## O que o usuário realmente pediu

Uso exclusivamente pessoal. O briefing inicial de plataforma foi corrigido em
conversa: NÃO construir app, editor, plataforma, ferramenta de equipe ou SaaS.
O assistente deve criar um vídeo de motion design explicativo a partir de um
áudio enviado no chat. O usuário descreve sua ideia e só precisa baixar o MP4
no GitHub. O assistente cuida da criação e da execução técnica.

## Preferências confirmadas

- Custo adicional zero: ferramentas gratuitas, sem APIs pagas e sem assinaturas.
- Estética minimalista, sofisticada e reconhecível como motion design.
- Elementos, diagramas, textos, fundos e animações contextuais acompanhando a fala.
- Não precisa mostrar o rosto do usuário. Não restringir a músicas ou videoclipes.
- Clareza narrativa e animação real; evitar slideshow e zoom em imagens estáticas.
- Cenas feitas para cada explicação, em vez de elementos aleatórios.
- O assistente deve executar o trabalho; não transferir tarefas técnicas ao usuário.
- O usuário pediu explicitamente para preparar e testar tudo e manter continuidade.
- Fish Audio/clonagem de voz foi discutido e depois explicitamente descartado.
- Em conversas de voz, deixar o usuário terminar de falar antes de responder.

## Fluxo acordado

1. Usuário envia áudio e ideia no chat.
2. Assistente verifica conteúdo e duração, prepara roteiro visual e marcações.
3. Assistente programa cenas vetoriais/2D/2.5D e sincroniza com a narração original.
4. Renderização H.264/AAC em MP4, formatos 16:9, 9:16 ou 1:1.
5. GitHub Actions disponibiliza o resultado como artefato para download.

## Localização

- Conta GitHub conectada: `sfelipemarketing-gif`.
- Repositório existente usado sem modificar o site: `Sfelipe-music-`.
- Branch dedicada: `motion-pessoal`; motor e documentos em `motion/`.
- Workflow: `.github/workflows/motion-render.yml`.
- A criação de um repositório novo foi negada pela permissão da integração;
  por isso foi escolhida uma branch separada no repositório existente.
- O repositório é público. O exemplo contém apenas código e som sintético
  original. Não enviar automaticamente gravações pessoais do usuário para ele.

## Continuidade e limites

Este arquivo registra decisões, não é uma promessa de memória automática em
todas as conversas. Para retomar em outro chat, abrir este arquivo e `STATUS.md`.
Nenhum áudio do usuário foi recebido até a preparação inicial. O exemplo não
contém transcrição, direção automática por IA ou clonagem de voz.

O Remotion é gratuito para uso individual conforme a licença consultada.
O workflow usa somente runner padrão em repositório público e bloqueia a
execução se o repositório passar a privado. Artefatos têm retenção curta.
O acesso à cobrança/saldo da conta não está disponível pela integração.
Consulte `STATUS.md` para saber o que foi efetivamente executado.
