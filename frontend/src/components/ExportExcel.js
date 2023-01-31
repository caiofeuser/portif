import * as FileSaver from 'file-saver';
import * as XLSX from 'sheetjs-style';
import IconButton from '@mui/material/IconButton';
import GetAppIcon from '@mui/icons-material/GetApp';
import Tooltip from '@mui/material/Tooltip';

const ExportExcel = ({ excelData, fileName }) => {
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  return (
    <Tooltip title="Export to CSV">
      <IconButton onClick={(e) => exportToExcel(fileName)}>
        <GetAppIcon />
      </IconButton>
    </Tooltip>
  )
}

export default ExportExcel;
