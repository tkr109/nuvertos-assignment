
const request = require('supertest');
const app = require('../app');
const sequelize = require('../database');
const Compound = require('../models/Compound');  

let server;
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNzI5MDk4MjI0LCJleHAiOjE3MjkxMDE4MjR9.23zLPcTJz_EbIvtWn5Ll1G7oq2n2lMZaU2NDyKGatt0';  

describe('Compounds API', () => {
  let createdCompoundId=22;

  
  beforeAll(async () => {
    await sequelize.sync({ force:true });  
    server = app.listen(4000);  
  
    
    const newCompound = await Compound.create({
      CompoundName: 'Test Compound',  
      CompounrDescription: 'This is a test compound description.',  
      strImageSource: 'https://google.com',
      strImageAttribution: 'Image by Example.com',  
      dateModified: new Date()  
    });
  
    console.log('Created Compound:', newCompound);
  
    createdCompoundId = newCompound.id;  
  });
  

  
  afterAll(async () => {
    await sequelize.close();  
    await server.close();  
  });

  
  it('should fetch all compounds', async () => {
    const res = await request(server).get('/api/compounds');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);  
  });

  
  it('should fetch a specific compound by ID', async () => {
    const res = await request(server).get(`/api/compounds/${createdCompoundId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('CompoundName', 'Test Compound');
  });

  
  it('should update a compound', async () => {
    const updatedCompound = {
      CompoundName: 'Updated Test Compound'
    };

    const res = await request(server)
      .put(`/api/compounds/${createdCompoundId}`)
      .set('Authorization', `Bearer ${token}`)  
      .send(updatedCompound);

    expect(res.statusCode).toBe(200);
    expect(res.body.CompoundName).toBe('Updated Test Compound');
  });

  
  it('should delete a compound', async () => {
    const res = await request(server)
      .delete(`/api/compounds/${createdCompoundId}`)
      .set('Authorization', `Bearer ${token}`);  

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Compound deleted');
  });
});
