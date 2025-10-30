/// <reference types="cypress" />

describe('Dog API - Conjunto de Testes de Qualidade', () => {
    
    // URL base da API
    const BASE_URL = 'https://dog.ceo/api';
    
    // Raça de teste que sabemos que existe
    const VALID_BREED = 'hound';
    // Raça que não existe para teste de cenário de erro
    const INVALID_BREED = 'nonexistentbreed123'; 

    // =========================================================================
    // ENDPOINT 1: GET /breeds/list/all - Listar todas as raças
    // =========================================================================
    it('GET /breeds/list/all: Deve retornar o status 200 e a lista de raças no formato correto', () => {
        cy.request({
            method: 'GET',
            url: `${BASE_URL}/breeds/list/all`
        }).then((response) => {
            // 1. Validar Status Code
            expect(response.status).to.equal(200);

            // 2. Validar Estrutura da Resposta
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('message').that.is.an('object');

            // 3. Validar Conteúdo (Deve conter pelo menos algumas raças conhecidas)
            const breeds = response.body.message;
            expect(Object.keys(breeds).length).to.be.at.least(50); // Deve ter um número mínimo de raças
            expect(breeds).to.have.property('labrador');
            expect(breeds.hound).to.be.an('array'); // As sub-raças devem ser um array
        });
    });

    // =========================================================================
    // ENDPOINT 2: GET /breed/{breed}/images - Imagens por Raça
    // =========================================================================
    
    context('GET /breed/{breed}/images', () => {
        
        // CENÁRIO 2.1: Raça Válida
        it('2.1: Deve retornar o status 200 e pelo menos uma imagem para uma raça válida', () => {
            cy.request({
                method: 'GET',
                url: `${BASE_URL}/breed/${VALID_BREED}/images`
            }).then((response) => {
                // 1. Validar Status Code
                expect(response.status).to.equal(200);

                // 2. Validar Estrutura e Conteúdo
                expect(response.body).to.have.property('status', 'success');
                expect(response.body).to.have.property('message').that.is.an('array');
                expect(response.body.message.length).to.be.at.least(1); // Pelo menos uma imagem

                // 3. Validar Tipo de Dado (O primeiro item deve ser uma URL de imagem)
                const imageUrl = response.body.message[0];
                expect(imageUrl).to.be.a('string');
                expect(imageUrl).to.include(VALID_BREED); // A URL deve conter o nome da raça
                expect(imageUrl).to.match(/\.(jpg|jpeg|png)$/i); // Deve terminar com extensão de imagem
            });
        });

        // CENÁRIO 2.2: Raça Inválida (Negativo)
        it('2.2: Deve retornar status 404 para uma raça inexistente', () => {
            // O Cypress falha por padrão em status codes diferentes de 2xx. 
            // Usamos failOnStatusCode: false para testar o 404.
            cy.request({
                method: 'GET',
                url: `${BASE_URL}/breed/${INVALID_BREED}/images`,
                failOnStatusCode: false
            }).then((response) => {
                // 1. Validar Status Code
                expect(response.status).to.equal(404);

                // 2. Validar Mensagem de Erro
                expect(response.body).to.have.property('status', 'error');
                expect(response.body.message).to.include('Breed not found');
            });
        });
    });

    // =========================================================================
    // ENDPOINT 3: GET /breeds/image/random - Imagem Aleatória
    // =========================================================================
    it('GET /breeds/image/random: Deve retornar o status 200 e uma URL de imagem aleatória', () => {
        cy.request({
            method: 'GET',
            url: `${BASE_URL}/breeds/image/random`
        }).then((response) => {
            // 1. Validar Status Code
            expect(response.status).to.equal(200);

            // 2. Validar Estrutura e Conteúdo
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('message').that.is.a('string');

            // 3. Validar que é uma URL de Imagem Válida
            const imageUrl = response.body.message;
            expect(imageUrl).to.match(/^https?:\/\//); // Deve começar com http(s)
            expect(imageUrl).to.match(/\.(jpg|jpeg|png)$/i); // Deve terminar com extensão de imagem
            
            // 4. Teste de Consistência (Opcional): Verificar se a imagem pode ser acessada (Teste de Saúde da URL)
            cy.request({
                method: 'GET',
                url: imageUrl,
                failOnStatusCode: false // Aceita status como 403, 404, etc.
            }).then((imageResponse) => {
                // Embora o status 200 seja ideal, 404 ou 403 indica que a imagem não existe/é proibida, 
                // mas 200 ou 300+ é o esperado para um endpoint funcional.
                expect(imageResponse.status).to.be.oneOf([200, 301, 302]); 
            });
        });
    });

});