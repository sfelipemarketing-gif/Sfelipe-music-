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
