interface IGoogleDetail {
  text: string;
  value: number;
}

interface IGoogleRowElement {
  distance: IGoogleDetail;
  duration: IGoogleDetail;
}

export default IGoogleRowElement;
