import { useCallback, useEffect, useState } from "react";
import { WidgetData } from "../../types/Type";
import axios from "axios";

function useWidgetData<T extends WidgetData>(id: number, initialValue: T) {
  const [widgetData, setWidgetData] = useState<T>(initialValue);

  const fetchPosition = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_API_APP_URL}/api/widget/get`,
        { params: { id } }
      );
      setWidgetData(response.data);
      console.log("위젯 정보를 불러오는 데 성공했습니다.");
    } catch (error) {
      console.error("위젯 정보를 불러오는 데 실패했습니다.", error);
    }
  }, [id]);

  useEffect(() => {
    fetchPosition();
  }, [fetchPosition]);

  useEffect(() => {
    async function saveWidgetData() {
      try {
        await axios.post(`${process.env.REACT_API_APP_URL}/api/widget/save`, {
          id,
          widgetData,
        });
        console.log("위젯 정보가 저장되었습니다.");
      } catch (error) {
        console.error("위젯 정보 저장에 실패했습니다.", error);
      }
    }

    saveWidgetData();
  }, [id, widgetData]);

  return { widgetData, setWidgetData };
}

export default useWidgetData;
