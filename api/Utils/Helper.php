<?phpnamespace Utils;class Helper {	static function convertRequestParamToArray($param) {      // code	   $result = array();	   $properties = get_object_vars($param);	   foreach($properties as $pro){		 $result[$pro] = $param[$pro]; 	   }	   return $result;	}}?>