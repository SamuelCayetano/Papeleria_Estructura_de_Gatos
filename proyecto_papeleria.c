#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define MAX_LONG_NOMBRE 50
#define MAX_LONG_ID 27
#define MAX_LONG_CLIENTE 25
#define MAX_LONG_FAB 30

struct producto
{
    char nombre[MAX_LONG_NOMBRE];
    char identificador[MAX_LONG_ID];
    float precio;
    //int stock;
    char cliente[MAX_LONG_CLIENTE];
    char fabricante[MAX_LONG_FAB];
};

/*Esta funcion es de control, verifica que la entrada @val caiga dentro del rango establecido de @max y @min, de igual forma 
se establecio que solo funcione con un numero limitado de @intentos*/


/*Esta funcion es de control pero no tiene un numero de intentos definido ya que, verifica que la entreada @val caiga dentro del rango establecido de @max y @min
por lo que en caso de no caer en dicho rango esta funcion le seguira pidiendo al usuario indefinidamente que ingrese un numero correcto que corresponda al rango*/
int control_input_indef(int val, int max, int min){
	
	while(val < min ||val > max){
		printf("Ha ingresado un valor icorrecto, porfavor escriba el digito que aparece al lado de la opcion que desea.");
		printf("Teclea un digito para seleccionar: ");
		scanf("%d", &val);
	}
	
	return val;
}

int captura_productos(int numProduct, struct producto *productos, int inventario_total,int limite_product){
    //Capturar los datos de nuevos productos, para ello necesitamos el numero de prod. @numProduct a capturar para la fincion
    char bufferPrecio[MAX_LONG_ID]; //Creo el buffer especifico para la conversion de los precios
    
    // Limpiar el buffer de entrada
	int c;
	while ((c = getchar()) != '\n' && c != EOF);
	    
    if(numProduct > inventario_total)
	{
    	return inventario_total;
	}
	
	short inventario = limite_product - inventario_total; //Esto nos sirve para saber en el espacio de inventario en el que nos encontramos
	short control_inventario = inventario + numProduct; //Nos sirve para tener un control fijo de hasta donde llegara nuestra adicion con el ciclo
	
    for (int inventario; inventario < control_inventario; inventario++)
    {    
        printf("Ingrese el nombre del producto #%d: ", inventario+1);
        fgets(productos[inventario].nombre, MAX_LONG_NOMBRE, stdin);//En lugar de 'scanf", utilizo "fgets()' para capturar el STREAM y asi poder manipular los datos de la captura en mi struct que creamos
        productos[inventario].nombre[strcspn(productos[inventario].nombre, "\n")] = '\0'; //En la asignacion de productos[inventario].attrib elimina cualquier '\n' del final que pudo haber ingresado
        
		printf("Ingrese el identificador del producto #%d: ",inventario+1);
 		fgets(productos[inventario].identificador, MAX_LONG_ID, stdin);
        productos[inventario].identificador[strcspn(productos[inventario].identificador, "\n")] = '\0';
        
		printf("Ingrese el precio del producto #%d: ", inventario+1);
 		fgets(bufferPrecio, MAX_LONG_ID, stdin);
        bufferPrecio[strcspn(bufferPrecio, "\n")] = '\0';
        productos[inventario].precio = atof(bufferPrecio);
        
		printf("Ingrese el nombre del cliente a vender #%d: ", inventario+1);
		fgets(productos[inventario].cliente, MAX_LONG_CLIENTE, stdin);
        productos[inventario].cliente[strcspn(productos[inventario].cliente, "\n")] = '\0';     
        
		printf("Ingrese el nomobre del proveedor fabricante #%d: ", inventario+1);
        fgets(productos[inventario].fabricante, MAX_LONG_FAB, stdin);
        productos[inventario].fabricante[strcspn(productos[inventario].fabricante, "\n")] = '\0';
        
        printf("\n");
    }
    return inventario_total -= numProduct;    
}

void nuevos_productos(int inventario_total, int limite_product, struct producto *productos)
{
	bool control_subf = true;
	int sel_opcion = 0;
	int numProduct = 0;
	
	while(control_subf)
	{
		system("cls");
		printf("SISTEMA DE INGRESO DE PRODUCTOS\nSelecciona la accion que deseas realizar\n1. INGRESAR ARTICULOS\n2. SALIR A MENU ANT.\nDigite la opcion a seleccionar: ");
		scanf("%d", &sel_opcion);
		sel_opcion = control_input_intentos(sel_opcion, 2, 1, 2);
		
		switch(sel_opcion)
		{
			case 1:
				system("cls");
				printf("ADMIN PAPELERIA\nIngrese cantidad de articulos a capturar en el sistema - inventario disponible: [ %d ]", inventario_total);
				printf("Articulos a ingresar: ");
				scanf("%d", &numProduct);
				numProduct = control_input_intentos(numProduct, 50, 1, 2);
				inventario_total = captura_productos(numProduct, productos, inventario_total, limite_product);
				break;
			default:
				control_subf = false;
		}
	}
	control_subf = true;
}



int main() {
    struct producto productos[60];
    int sel_var = 0; //para seleccionar en el menu principal
    int sel_var_sub = 0; //para seleccionar en el submenu
    bool control_menu = true;
    bool control_sub_menu = true;
    int inventario_total = 50;
    int limite_product = 50;

    while(control_menu)
	{
	    system("cls");
        printf("Bienvenido al sistema de administracion de la papeleria\nselecciona como deseas acceder\n1. ADMIN. TIENDA\n2. CLIENTE\n3. SALIR\nTeclea un digito para seleccionar: ");
        scanf("%d", &sel_var);
        sel_var = control_input_intentos(sel_var, 3, 1, 3);
        
        switch(sel_var)
		{
        	case 1:
        		    while(control_sub_menu)
					{
						system("cls");
        		    	printf("Interfaz de administrador\nselecciona como deseas acceder\n1. CAPTURA PRODUCTOS\n2. BORRAR PRODUCTOS\n3. MOSTRAR PORDUCTOS\n4. MODIFICAR PRODUCTOS\n5. BUSCAR PRODUCTOS\n6. PRODUCTOS VENDIDOS\n7. ANADIR PRODUCTO\n8. SALIR\nTeclea un digito para seleccionar: ");
	        			scanf("%d", &sel_var_sub);
	        			sel_var_sub = control_input_indef(sel_var_sub, 8, 1);
	        			
	        			switch(sel_var_sub)
						{
	        				case 1:
	        					nuevos_productos(inventario_total, limite_product, productos);
	        					break;
	        				case 2:
	        					break;
	        				case 3:
	        					break;
	        				case 4:
	        					break;
	        				case 5:
	        					break;
	        				case 6:
	        					break;
	        				case 7:
	        					break;
	        				default:
	        					control_sub_menu = false;
						}
					}
					control_sub_menu = true;
        		break;
        	case 2:
        		break;
        	default:
        		control_menu = false;
		}
    }

    return 0;
}