const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD", () => {
  test("obtener un codigo 200 en la ruta productos", async () => {
    const response = await request(server).get("/productos").send();

    expect(response.statusCode).toBe(200);
  });

  it("obtener un codigo 404 de una ruta que no existe", async () => {
    const response = await request(server).get("/usuarios").send();
    expect(response.statusCode).toBe(404);
  });
  test("obteniendo un producto", async () => {
    const { body } = await request(server).post("/productos/1").send();
    const producto = body;
    expect(producto).toBeInstanceOf(Object);
  });

  it("obteniendo un producto en arreglo", async () => {
    const response = await request(server).get("/productos").send();
    expect(response.body).toBeInstanceOf(Array);
  });

  test("enviando un  nuevo producto", async () => {
    const id = Math.floor(Math.random() * 999);
    const producto = { id, nombre: "Nuevo producto" };
    const { body: productos } = await request(server)
      .post("/productos")
      .send(producto);
    expect(productos).toContainEqual(producto);
  });
    
    it('editando un producto que no existe', async () => {
    
    const id = "este id no existe";
    const producto = { id, nombre: "Nuevo producto" };
    const { statusCode } = await request(server)
      .put("/productos")
      .send(producto);
    expect(statusCode).toBe(404);
    
    })

      it("Eliminando un producto", async () => {
        const jwt = "token";
        const idDeProductoAEliminar = 4;
        const { body: productos } = await request(server)
          .delete(`/productos/${idDeProductoAEliminar}`)
          .set("Authorization", jwt)
          .send();
        const ids = productos.map((p) => p.id);
        expect(ids).not.toContain(idDeProductoAEliminar);
      });

      it("Intentando eliminar un producto sin token", async () => {
        const { statusCode } = await request(server)
          .delete("/productos/1")
          .send();
        expect(statusCode).toBe(400);
      });
    
});
