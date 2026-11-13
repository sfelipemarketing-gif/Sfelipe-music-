# Verificação da primeira versão

Executada em 31/10/2026, em Chromium headless, com Playwright como ferramenta de teste externa ao site. O projeto entregue não depende dessas ferramentas.

Resultado: **11 grupos de verificações passaram**.

1. Catálogo com três faixas, capas carregadas, nenhuma reprodução automática e caminhos funcionando sob `/sfelipe-music/`, como em um repositório Pages.
2. Reprodução real dos MP3, pausa, botões sincronizados, progresso e mudança da posição no áudio.
3. Próxima faixa, faixa anterior, seleção pela biblioteca e alteração do volume.
4. Avanço automático ao fim da música; parada ao terminar a última.
5. Metadados e estado de reprodução na Media Session API disponível no Chromium.
6. Compartilhamento: teste das chamadas nativas, cópia automática e caixa de link selecionável quando a cópia é bloqueada. As APIs nativas e permissões foram simuladas para verificar cada caminho da interface; nenhum link foi enviado a outra pessoa.
7. Links diretos selecionando a faixa certa sem autoplay; link inválido recebendo orientação.
8. Nenhum erro JavaScript, resposta 404 ou requisição externa na navegação normal.
9. Larguras de 320, 375, 390, 430 e 768 px com perfil móvel: sem transbordamento horizontal, player sem impedir acesso ao final do conteúdo, toque para reproduzir e volume oculto no perfil de iPhone.
10. Catálogo vazio com controles desativados; catálogo de músicas reais removendo os avisos de demonstração automaticamente.
11. Erros provocados de propósito: áudio ausente mostra mensagem, imagem ausente usa capa reserva e a próxima faixa continua funcionando.

Também foram verificadas a sintaxe dos arquivos JavaScript, a integridade do ZIP e a estrutura dos MP3. As capas foram inspecionadas visualmente em computador e em largura de celular.

## Limites desta verificação

- O perfil móvel é uma **simulação em Chromium**, não um iPhone físico nem o Safari real.
- Segundo plano, tela bloqueada, botões de mídia e painel nativo de compartilhamento precisam de conferência no seu próprio iPhone após abrir o site em HTTPS. Dependem do navegador e do iOS.
- O teste completo do progresso usou servidor local com suporte a **HTTP Range**, para representar o fornecimento de arquivos estáticos no Pages. O servidor simples `python3 -m http.server` pode limitar a busca no áudio.
- Os arquivos foram posteriormente enviados ao repositório autorizado `sfelipemarketing-gif/Sfelipe-music-`. O site **não foi publicado** e o Pages não foi ativado. O endereço real do Pages ainda precisa ser conferido depois da publicação pelo usuário.

Use o checklist de teste em `README.md` para revisar o resultado no seu aparelho.

## Inclusão de Where the Road Ends — 31/10/2026

A primeira música real foi enviada pelo artista. O arquivo original MP3 tem 5.603.708 bytes, aproximadamente 3min53s e bitrate de 192 kbps. A capa JPEG quadrada de 912 × 912 pixels foi extraída da imagem embutida no MP3, sem alteração do áudio. A data no catálogo representa a inclusão no site, pois a data original de lançamento não foi informada. A publicação inicial do Pages foi concluída com sucesso antes desta inclusão.

Verificações desta atualização: decodificação integral do áudio sem erros, correspondência do SHA do blob com o MP3 original, título e capa em destaque, identificação como SFelipe sem selo de demonstração, reprodução e pausa, busca para 1min35s, próxima/anterior, metadados de mídia e link individual sem autoplay. Em Chromium com perfil móvel, larguras de 320 e 390 px ficaram sem transbordamento e com toque para reproduzir. As limitações de teste em iPhone físico e segundo plano continuam as mesmas descritas acima.

## Inclusão de Running to you — 31/10/2026

MP3 original com 4.894.242 bytes, duração de 3min32s e capa JPEG embutida de 360 × 360 pixels. Áudio e capa foram preservados. Passaram a decodificação integral, verificação do SHA do blob, reprodução, pausa, busca, seleção por link, navegação entre as duas músicas reais e conferência dos metadados. O catálogo tem duas músicas reais e três demonstrações. O layout foi conferido em 320 e 390 px. A data do catálogo é a de inclusão no site.


## Inclusão de Keep my people close — 31/10/2026

MP3 original com 7.630.054 bytes, duração de 5min34s e capa JPEG embutida de 360 × 360 pixels. Foram preservados áudio e imagem. Passaram a decodificação integral, a correspondência do SHA, reprodução, pausa, busca para 1min35s, próxima/anterior, metadados de mídia e link direto sem autoplay. O catálogo agora tem três músicas reais e três demonstrações identificadas. O layout foi conferido em 320 e 390 px. A data usada é a inclusão no site.


## Inclusão de You Don’t Even Know — 31/10/2026

Título obtido dos metadados do MP3. Arquivo original com 7.305.955 bytes, duração de 5min18s e capa JPEG embutida de 360 × 360 pixels. Áudio e capa preservados. Passaram a decodificação integral, verificação do SHA, reprodução, pausa, busca, próxima/anterior, metadados e seleção por link sem autoplay. O catálogo tem quatro músicas reais e três demos. O layout foi conferido em 320 e 390 px. A data do catálogo corresponde à inclusão no site.


## Retirada das demonstrações — 31/10/2026

Foram retirados os três blocos de demonstração do catálogo, seus MP3 e capas (PNG e SVG) e o gerador opcional dos exemplos. As quatro músicas reais e suas capas foram preservadas. O aviso de demonstração fica oculto. As prévias e o README foram atualizados para o catálogo real. Passaram a conferência de quatro faixas, ausência de selos de demonstração, reprodução, pausa, busca, próxima/anterior e layout em 320 e 390 px. Um link antigo de demonstração seleciona a primeira faixa real sem autoplay e informa que a faixa não está disponível. Os testes anteriores deste documento são históricos.

## Identidade visual com logo original — 31/10/2026

A logo JPEG enviada pelo artista foi preservada e aplicada ao cabeçalho, apresentação principal, rodapé e pinceladas decorativas por CSS. O tema usa preto, branco e azul neon nos controles. Não foram adicionadas funcionalidades nem modificados os MP3, capas ou catálogo.

Verificações em Chromium: 320, 375, 390, 430, 768, 1024 e 1440 px sem transbordamento horizontal ou erros JavaScript/404; logo carregada nas três posições, nomes acessíveis, navegação entre início e biblioteca, reprodução e pausa, próxima faixa, seleção de outra música e acesso aos botões acima do player fixo. O perfil de iPhone oculta o volume por JavaScript. O teste é uma simulação; não substitui a conferência no Safari do iPhone físico. As duas prévias foram atualizadas.


## Inclusão de oito músicas — 13/11/2026

Adicionadas O Tempo Não Espera, Você Me Faz Arrepiar, THE WORLD WITH YOU, More Than One Lifetime, Sem Freio, Do Nada Pro Topo, SOBRECARGA DO SISTEMA e Doce Veneno. O catálogo passou de quatro para 12 músicas reais, sem demonstrações. Os oito MP3 somam 48.326.927 bytes e foram preservados integralmente; todas as capas JPEG de 360 × 360 pixels foram extraídas sem recompressão. A data cadastrada é a inclusão no site; as datas originais de lançamento não foram informadas.

Passaram a decodificação integral dos oito áudios, verificação de SHA de cada MP3 e capa enviados ao GitHub, reprodução e pausa de cada faixa, busca para 30 segundos, título/artista/capa/duração, seleção por oito links individuais sem autoplay, próxima/anterior e parada ao final da biblioteca. Foram confirmadas 12 linhas da biblioteca e três destaques, zero erros JavaScript/404 e ausência de avisos de demonstração. O perfil móvel em Chromium foi conferido em 320, 390 e 768 px; as prévias foram atualizadas. Segundo plano e Safari em um iPhone físico continuam sujeitos às limitações já documentadas.
