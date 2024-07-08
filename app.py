#  Importar las herramientas
# Acceder a las herramientas para crear la app web
from flask import Flask, render_template, jsonify, url_for, request

# Para manipular la DB
from flask_sqlalchemy import SQLAlchemy 

# Módulo cors es para que me permita acceder desde el frontend al backend
from flask_cors import CORS

import logging

# Crear la app
app = Flask(__name__, template_folder='templates', static_url_path='/static')

app.debug = True
# Configurar el registrador
logging.basicConfig(level=logging.DEBUG)

# permita acceder desde el frontend al backend
CORS(app)


# Configurar a la app la DB
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://usuario:contraseña@localhost:3306/nombre_de_la_base_de_datos'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/productos'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Crear un objeto db, para informar a la app que se trabajará con sqlalchemy
db = SQLAlchemy(app)



# Definir la tabla 
class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    precio = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    imagen = db.Column(db.String(400))
    categoria = db.Column(db.String(50))

    def __init__(self, nombre, precio, stock, imagen, categoria):
        self.nombre = nombre
        self.precio = precio
        self.stock = stock
        self.imagen = imagen
        self.categoria = categoria
        
# 8. Crear la tabla al ejecutarse la app
with app.app_context():
    db.create_all()


# Crear ruta de acceso

# / es la ruta de inicio
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/carrito')
def carrito():
    return render_template('carrito.html')

@app.route('/editar_producto')
def editar_producto():
    return render_template('editar_producto.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/index_producto_y_servicio')
def index_producto_y_servicio():
    return render_template('index_producto_y_servicio.html')

@app.route('/ingresar_producto')
def ingresar_producto():
    return render_template('ingresar_producto.html')

@app.route('/servicios2')
def servicios2():
    return render_template('servicios2.html')

# Ruta para obtener todos los productos en formato JSON
@app.route('/productos', methods=['GET'])
def obtener_productos():
    try:
        productos = Producto.query.all()  # Obtener todos los productos desde la base de datos

        # Serializar los productos a formato JSON
        data_serializada = [
            {
                "id": producto.id,
                "nombre": producto.nombre,
                "precio": producto.precio,
                "stock": producto.stock,
                "imagen": producto.imagen,
                "categoria": producto.categoria
            }
            for producto in productos
        ]

        return jsonify(data_serializada)

    except Exception as e:
        app.logger.error(f"Error al obtener productos: {str(e)}")
        return jsonify({'error': 'Error al obtener productos: ' + str(e)}), 500

@app.route('/tabla_productos')
def tabla_productos():
    try:
        productos = Producto.query.all()  # Obtener todos los productos desde la base de datos
        return render_template('tabla_productos.html', producto=productos)  # Pasar la lista de productos a la plantilla

    except Exception as e:
        app.logger.error(f"Error al renderizar tabla_productos.html: {str(e)}")
        return jsonify({'error': 'Error al cargar la página: ' + str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

@app.route('/urls')
def get_urls():
    urls = {
        'contacto': url_for('contacto'),
        'nosotros': url_for('nosotros'),
        'home': url_for('home'),
        'tabla_productos': url_for('tabla_productos')
        # Otras URLs necesarias
    }
    return jsonify(urls)
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