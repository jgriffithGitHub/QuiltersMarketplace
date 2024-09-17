import { v4 as uuidv4 } from 'uuid';

export class Swatch { 
  app_id: string;
  description: string;
  quantityType: string;
  quantity: number;
  imageUrl: string;
  editable: boolean = false;  
   
  constructor(id?: string,
              description?: string,
              quantityType?: string,
              quantityUnits?: number,
              image?: string
              )
 { 
    console.log("id: " + (id || ''));
    this.app_id = id || uuidv4();
    this.description = description || '';
    this.quantityType = quantityType || 'bolt';
    this.quantity = quantityUnits || 0;
    this.imageUrl = image || '';
  }

  static getDaoFromSwatch(details: Swatch) {
    console.log("getDaoFromSwatch -- id: " + details.app_id);
    return { 
	    app_id: details.app_id,
      description: details.description, 
      quantityType: details.quantityType, 
      quantityUnits: details.quantity, 
      image: details.imageUrl
    };
  }
  
  static getSwatchFromDao(details: any) {
    const daoSwatch = JSON.parse(JSON.stringify(details));
    let newSwatch = new Swatch(
                          daoSwatch.app_id,
                          daoSwatch.description, 
	                        daoSwatch.quantityType, 
	                        daoSwatch.quantityUnits, 
                          daoSwatch.image
	                      );
    return newSwatch;
  }
}