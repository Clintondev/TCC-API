# Ambiente Manual - CI/CD TCC

Este documento descreve o processo manual para realizar integração de código, execução de testes, build e deploy da API, sem a automação oferecida por pipelines CI/CD.

---

## **1. Pré-requisitos**

Certifique-se de ter as ferramentas abaixo instaladas no seu ambiente:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/)
- [AWS CLI](https://aws.amazon.com/cli/) configurado com credenciais válidas.
- Permissão para acessar o Amazon Elastic Container Registry (ECR) e o Amazon Elastic Container Service (ECS).

---

## **2. Passos Manuais**

### **2.1. Integração de Código**
1. Certifique-se de que todas as alterações foram mescladas na branch `manual-process`.
2. Baixe o código atualizado:
   ```bash
   git pull origin manual-process

2.2. Instalação de Dependências
	1.	Instale as dependências do projeto:

npm install

2.3. Execução de Testes
	1.	Execute os testes localmente para garantir que o código está funcionando:

npm test


	2.	Verifique os resultados dos testes e corrija quaisquer falhas antes de continuar.

2.4. Build da Imagem Docker
	1.	Construa a imagem Docker localmente:

docker build -t ci-cd-api-tcc .


	2.	Confirme que a imagem foi criada:

docker images

2.5. Login no Amazon ECR
	1.	Faça login no ECR usando o AWS CLI:

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com


	2.	Substitua <AWS_ACCOUNT_ID> pelo ID da sua conta AWS.

2.6. Push da Imagem para o ECR
	1.	Marque a imagem com o repositório do ECR:

docker tag ci-cd-api-tcc:latest <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/ci-cd-api-tcc:latest


	2.	Envie a imagem para o ECR:

docker push <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/ci-cd-api-tcc:latest

2.7. Atualização do Serviço ECS
	1.	Acesse o console do AWS ECS.
	2.	Encontre o cluster e o serviço onde a API está configurada.
	3.	Atualize manualmente a definição da tarefa para usar a nova imagem enviada ao ECR.

3. Testando o Deploy
	1.	Acesse o endpoint da API no ambiente de produção.
	2.	Valide se as mudanças estão refletidas.

4. Observações
	•	Este processo manual é sujeito a erros e requer mais tempo para execução.
	•	A automação com CI/CD pode otimizar significativamente este fluxo.



---
