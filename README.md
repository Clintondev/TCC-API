
# CI/CD Enabled - CI/CD API TCC

Este projeto implementa um pipeline CI/CD completo para automação do ciclo de desenvolvimento, testes e deploy de uma API utilizando **GitHub Actions** e **AWS ECS**.

---

## **1. Fluxo do CI/CD**

O pipeline CI/CD, configurado no arquivo [`.github/workflows/ci.yml`](./.github/workflows/ci.yml), realiza as seguintes etapas:

1. **Build e Testes Automáticos:**
   - Instala dependências (`npm install`).
   - Executa os testes unitários (`npm test`).

2. **Build Docker e Deploy:**
   - Constrói uma imagem Docker da aplicação.
   - Faz login no **Amazon Elastic Container Registry (ECR)** e envia a imagem.
   - Atualiza a **definição de tarefa do Amazon ECS** para usar a nova imagem.

3. **Deploy no AWS ECS:**
   - Atualiza o serviço no cluster ECS.
   - Aguarda a estabilização do serviço.

---

## **2. Pré-requisitos**

### **2.1. Configuração no GitHub**
Certifique-se de configurar os **secrets** no GitHub Actions:

| Nome                          | Descrição                                                |
|-------------------------------|--------------------------------------------------------|
| `AWS_ACCESS_KEY_ID`           | Chave de acesso da AWS.                                |
| `AWS_SECRET_ACCESS_KEY`       | Chave secreta da AWS.                                  |
| `AWS_REGION_US`               | Região da AWS, ex.: `us-east-1`.                       |
| `ECR_REPOSITORY_PROD`         | Nome do repositório no Amazon ECR.                     |
| `ECS_CLUSTER_PROD`            | Nome do cluster ECS.                                   |
| `ECS_SERVICE_PROD`            | Nome do serviço ECS.                                   |
| `CONTAINER_PROD`              | Nome do contêiner na definição de tarefa.              |

### **2.2. Ferramentas Necessárias**
- **Docker:** Para construir e testar imagens localmente.
- **Node.js:** Para rodar a API e os testes localmente.
- **AWS CLI:** Para verificar serviços AWS (opcional).

---

## **3. Configuração do Projeto**

### **3.1. Estrutura do Projeto**

| Diretório/Arquivo            | Descrição                                                |
|------------------------------|---------------------------------------------------------|
| `src/`                       | Código-fonte da API.                                    |
| `tests/`                     | Testes unitários implementados com Mocha e Chai.       |
| `.github/workflows/ci.yml`   | Configuração do pipeline CI/CD no GitHub Actions.       |

### **3.2. Testando Localmente**
1. **Instale as dependências:**
   ```bash
   npm install

	2.	Execute os testes:

npm test


	3.	Rode a API localmente:

npm run start


	4.	Acesse a documentação Swagger:
	•	URL: http://localhost:3000/api-docs

4. Executando o Pipeline CI/CD

4.1. Build e Testes Automáticos
	1.	Faça alterações no código e envie para o repositório:

git add .
git commit -m "Atualização no código"
git push origin ci-cd-enabled


	2.	O pipeline será acionado automaticamente no GitHub Actions:
	•	Acesse a aba “Actions” no repositório para acompanhar o progresso.
	3.	Verificações executadas:
	•	Testes unitários: npm test
	•	Build da imagem Docker.

4.2. Deploy Automático
	1.	Após o build da imagem Docker:
	•	O pipeline envia a imagem para o ECR.
	•	Atualiza a definição de tarefa no ECS.
	•	Realiza o deploy no cluster.
	2.	Logs de cada etapa estão disponíveis no GitHub Actions.

5. Logs do Pipeline

5.1. Acessando os Logs
	1.	Vá até a aba “Actions” no repositório do GitHub.
	2.	Clique no workflow em execução.
	3.	Visualize os logs das etapas:
	•	Testes unitários
	•	Build Docker
	•	Deploy ECS

5.2. Logs de Erros
	•	Se o pipeline falhar, os logs exibirão o erro detalhado:
	•	Testes que não passaram.
	•	Erros no build Docker.
	•	Problemas no deploy no AWS ECS.

