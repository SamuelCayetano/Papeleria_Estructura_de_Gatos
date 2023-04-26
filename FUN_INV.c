#include "FUN_INV.h"

int control_input_intentos(int val, int max, int min, short intentos){
	
	while((val < min || val > max) && intentos > 0){
		printf("Ha ingresado un valor icorrecto, porfavor escriba el digito que aparece al lado de la opcion que desea, le quedan %d intentos\n", intentos);
		printf("Teclea un digito para seleccionar: ");
		scanf("%d", &val);
		intentos--;
	}
	
	return val;
}