#include <stdio.h>
#include <string.h>
#include <stdbool.h>


struct producto
{
    char nombre[50];
    char identificador[9];
    float precio;
    int stock;
    char cliente[25];
    char fabricante[30];
};

/*Esta funcion es de control, verifica que la entrada @val caiga dentro del rango establecido de @max y @min, de igual forma 
se establecio que solo funcione con un numero limitado de @intentos*/
int control_input_intentos(int val, int max, int min, short intentos){
	
	while((val < min || val > max) && intentos > 0){
		printf("Ha ingresado un valor icorrecto, porfavor escriba el digito que aparece al lado de la opcion que desea, le quedan %d intentos\n", intentos);
		printf("Teclea un digito para seleccionar: ");
		scanf("%d", &val);
		intentos--;
	}
	
	return val;
}

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


void captura_productos(int numProduct, struct producto productos[]){
    //Capturar los datos de nuevos productos, para ello necesitamos el numero de prod. @numProduct a capturar para la fincion
    for (int i = 0; i < numProduct; i++)
        {
            printf("Ingrese el nombre del producto #%d: ", i+1);
            scanf("%s", productos[i].nombre);
            printf("Ingrese el identificador del producto #%d: ",i+1);
            scanf("%f", &productos[i].identificador);
            printf("Ingrese el precio del producto #%d: ", i+1);
            scanf("%f", &productos[i].precio);
            printf("Ingrese el stock del producto #%d: ", i+1);
            scanf("%d", &productos[i].stock);
        }

        printf("\nLista de productos:\n");
        for (int i = 0; i < numProduct; i++)
        {
            printf("Producto #%d: %s\n", i+1, productos[i].nombre);
            printf("Identificador: %d \n", productos[i].identificador);
            printf("Precio: $%.2f\n", productos[i].precio);
            printf("Stock: %d unidades\n\n", productos[i].stock);
        }

}

int main() {
    struct producto productos[60];
    int sel_var = 0;
    bool control_menu = true;

    while(control_menu == true){
        printf("Bienvenido al sistema de administracion de la papeleria\nselecciona como deseas acceder\n1. ADMIN. TIENDA\n2. CLIENTE\n3. SALIR\nTeclea un digito para seleccionar: ");
        scanf("%d", &sel_var);
        control_input_intentos(sel_var, 3, 1, 3);
        
        switch(sel_var){
        	case 1:
        		break;
        	case 2:
        		break;
        	default:
        		control_menu = false;
		}
    }

    return 0;
}