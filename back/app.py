#  Importar las herramientas
# Acceder a las herramientas para crear la app web
from flask import Flask, request, jsonify, render_template

# Para manipular la DB
from flask_sqlalchemy import SQLAlchemy 

# Módulo cors es para que me permita acceder desde el frontend al backend
from flask_cors import CORS

# Crear la app
app = Flask(__name__, template_folder='../front')

# permita acceder desde el frontend al backend
CORS(app)


# Configurar a la app la DB
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://usuario:contraseña@localhost:3306/nombre_de_la_base_de_datos'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:libertinaje88@localhost:3306/productos'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Crear un objeto db, para informar a la app que se trabajará con sqlalchemy
db = SQLAlchemy(app)


# Definir la tabla 
class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    precio=db.Column(db.Integer)
    stock=db.Column(db.Integer)
    imagen=db.Column(db.String(400))
    categoria=db.Column(db.String(50))

    def __init__(self,nombre,precio,stock,imagen,categoria):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.precio=precio
        self.stock=stock
        self.imagen=imagen
        self.categoria=categoria


# 8. Crear la tabla al ejecutarse la app
with app.app_context():
    db.create_all()

# Crear ruta de acceso
# / es la ruta de inicio
@app.route("/")
def index():
    return render_template('index.html')

# Crear un registro en la tabla Productos
@app.route("/registro", methods=['POST']) 
def registro():
    # {"nombre": "Felipe", ...} -> input tiene el atributo name="nombre"
    nombre_recibido = request.json["nombre"]
    precio=request.json['precio']
    stock=request.json['stock']
    imagen=request.json['imagen']
    categoria = request.json["categoria"]

    nuevo_registro = Producto(nombre=nombre_recibido,precio=precio,stock=stock,imagen=imagen,categoria=categoria)
    db.session.add(nuevo_registro)
    db.session.commit()

    return "Solicitud de post recibida"
    

# Retornar todos los registros en un Json
@app.route("/productos",  methods=['GET'])
def productos():
    # Consultar en la tabla todos los registros
    # all_registros -> lista de objetos
    all_registros = Producto.query.all()

    # Lista de diccionarios
    data_serializada = []
    
    for objeto in all_registros:
        data_serializada.append({"id":objeto.id, "nombre":objeto.nombre, "precio":objeto.precio, "stock":objeto.stock, "imagen":objeto.imagen, "categoria":objeto.categoria})

    return jsonify(data_serializada)


# Modificar un registro
@app.route('/update/<id>', methods=['PUT'])
def update(id):
    # Buscar el registro a modificar en la tabla por su id
    producto = Producto.query.get(id)

    # {"nombre": "Felipe"} -> input tiene el atributo name="nombre"
    nombre = request.json["nombre"]
    precio=request.json['precio']
    stock=request.json['stock']
    imagen=request.json['imagen']
    categoria = request.json["categoria"]

    producto.nombre=nombre
    producto.precio=precio
    producto.stock=stock
    producto.imagen=imagen
    producto.categoria=categoria
    db.session.commit()

    data_serializada = [{"id":producto.id, "nombre":producto.nombre, "precio":producto.precio, "stock":producto.stock, "imagen":producto.imagen, "categoria":producto.categoria}]
    
    return jsonify(data_serializada)


@app.route('/borrar/<id>', methods=['DELETE'])
def borrar(id):
    
    # Se busca a la productos por id en la DB
    producto = Producto.query.get(id)

    # Se elimina de la DB
    db.session.delete(producto)
    db.session.commit()

    data_serializada = [{"id":producto.id, "nombre":producto.nombre, "precio":producto.precio, "stock":producto.stock, "imagen":producto.imagen, "categoria":producto.categoria}]

    return jsonify(data_serializada)


if __name__ == "__main__":
    app.run(debug=True)