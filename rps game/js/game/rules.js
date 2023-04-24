class Rules {

    static scissors = 0;

    static rock = 1;

    static paper = 2;

    static handWin(p1, p2) {
        
        if(p1 == 0){
            if(p2 == 1){
                return p2;
            } else {
                return p1;
            }
        } else if (p1 == 1){
            if(p2 == 2){
                return p2;
            } else {
                return p1;
            }
        } else {
            if(p2 == 0){
                return p2;
            } else {
                return p1;
            }
        }
    }

    
}

//done