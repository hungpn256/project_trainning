import {ThemeProvider} from '@react-navigation/native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {ScrollView, StyleSheet, Text, View, TextInput} from 'react-native';
import CheckBox from 'react-native-check-box';
import Table from './components/Table';
const column = [
  {
    dataIndex: 'luongGross',
    name: 'Lương Gross',
  },
  {
    dataIndex: 'baoHiem',
    name: 'Bảo hiểm',
  },
  {
    dataIndex: 'thueTNCN',
    name: 'Thuế TNCN',
  },
  {
    dataIndex: 'luongNet',
    name: 'Lương Net',
  },
];
const column2 = [
  {
    dataIndex: 'luongGross',
    name: 'Lương Gross',
  },
  {
    dataIndex: 'baoHiemXaHoi',
    name: 'Bảo hiểm xã hội (8%)',
  },
  {
    dataIndex: 'baoHiemYTe',
    name: 'Bảo hiểm y tế (1.5%)',
  },
  {
    dataIndex: 'baoHiemThatNghiep',
    name: 'Bảo hiểm thất nghiệp (1%)',
  },
  {
    dataIndex: 'thuNhapTruocThue',
    name: 'Thu nhập trước thuế',
  },
  {
    dataIndex: 'giamTruBanThan',
    name: 'Giảm trừ gia cảnh bản thân',
  },
  {
    dataIndex: 'giamTruNguoiPhuThuoc',
    name: 'Giảm trừ gia cảnh người phụ thuộc',
  },
  {
    dataIndex: 'thuNhapChiuThue',
    name: 'Thu nhập chịu thuế',
  },
  {
    dataIndex: 'thueTNCN',
    name: 'Thuế thu nhập cá nhân(*)',
  },
  {
    dataIndex: 'luongNet',
    name: 'Lương NET',
  },
];
const column3 = [
  {
    name: 'Mức chịu thuế',
    dataIndex: 'mucChiuThue',
  },
  {
    name: 'Thuế suất',
    dataIndex: 'thueSuat',
  },
  {
    name: 'Tiền nộp',
    dataIndex: 'tienNop',
  },
];
const column4 = [
  {
    name: 'Lương GROSS',
    dataIndex: 'luongGross',
  },
  {
    name: 'Bảo hiểm xã hội (17%)',
    dataIndex: 'baoHiemXaHoi',
  },
  {
    name: 'Bảo hiểm Tai nạn lao động - Bệnh nghề nghiệp (0.5%)	',
    dataIndex: 'baoHiemTNLDBNN',
  },
  {
    name: 'Bảo hiểm y tế (3%)',
    dataIndex: 'baoHiemYTe',
  },
  {
    name: 'Bảo hiểm thất nghiệp (1%)',
    dataIndex: 'baoHiemThatNghiep',
  },
  {
    name: 'Tổng cộng',
    dataIndex: 'tongCong',
  },
];

function formatMoney(n, currency = '') {
  return currency + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const PayRoll = () => {
  const [revenue, setRevenue] = useState('');
  const [insurrance, setInsurrance] = useState(true);
  const [insuranceMoney, setInsuranceMoney] = useState('');
  const [area, setArea] = useState(1);
  const [people, setPeople] = useState('');
  const [data, setData] = useState({
    luongGross: 0,
    luongNet: 0,
    baoHiem: 0,
    thueTNCN: 0,
  });
  const [data2, setData2] = useState({
    luongGross: 0,
    baoHiemXaHoi: 0,
    baoHiemYTe: 0,
    baoHiemThatNghiep: 0,
    thuNhapTruocThue: 0,
    giamTruBanThan: 0,
    giamTruNguoiPhuThuoc: 0,
    thuNhapChiuThue: 0,
    thueTNCN: 0,
    luongNet: 0,
  });
  const [data3, setData3] = useState([
    {
      mucChiuThue: 'Đến 5 triệu VNĐ',
      thueSuat: '5%',
      tienNop: 0,
    },
    {
      mucChiuThue: 'Trên 5 -> 10 triệu VNĐ',
      thueSuat: '10%',
      tienNop: 0,
    },
    {
      mucChiuThue: 'Trên 10 -> 18 triệu VNĐ',
      thueSuat: '15%',
      tienNop: 0,
    },
    {
      mucChiuThue: 'Trên 18 -> 32 triệu VNĐ',
      thueSuat: '20%',
      tienNop: 0,
    },
    {
      mucChiuThue: 'Trên 32 -> 52 triệu VNĐ',
      thueSuat: '25%',
      tienNop: 0,
    },
    {
      mucChiuThue: 'Trên 52 -> 80 triệu VNĐ',
      thueSuat: '30%',
      tienNop: 0,
    },
    {
      mucChiuThue: 'Trên 80 triệu VNĐ',
      thueSuat: '35%',
      tienNop: 0,
    },
  ]);
  const [data4, setData4] = useState({
    luongGross: 0,
    baoHiemXaHoi: 0,
    baoHiemTNLDBNN: 0,
    baoHiemYTe: 0,
    baoHiemThatNghiep: 0,
    tongCong: 0,
  });
  function convertGrossToNet(revenue) {
    const t2_luongGross = parseInt(revenue);
    const t2_baoHiemXaHoi = -Math.min(
      Math.floor(t2_luongGross * 0.08),
      2384000,
    );
    const t2_baoHiemYTe = -Math.min(Math.floor(t2_luongGross * 0.015), 447000);
    const t2_baoHiemThatNghiep = -Math.min(
      Math.floor(t2_luongGross * 0.01),
      884000,
    );
    const t2_thuNhapTruocThue =
      t2_luongGross + t2_baoHiemXaHoi + t2_baoHiemYTe + t2_baoHiemThatNghiep;
    const t2_giamTruBanThan = -11000000;
    const t2_giamTruNguoiPhuThuoc =
      people.length > 0 ? -parseInt(people) * 4400000 : 0;
    let t2_thuNhapChiuThue =
      t2_thuNhapTruocThue + t2_giamTruBanThan + t2_giamTruNguoiPhuThuoc;
    t2_thuNhapChiuThue = t2_thuNhapChiuThue >= 0 ? t2_thuNhapChiuThue : 0;
    const t3_5tr =
      t2_thuNhapChiuThue >= 5000000
        ? 250000
        : Math.floor(t2_thuNhapChiuThue * 0.05);
    const t3_10tr =
      t2_thuNhapChiuThue <= 5000000
        ? 0
        : t2_thuNhapChiuThue >= 10000000
        ? 500000
        : Math.floor((t2_thuNhapChiuThue - 5000000) * 0.1);
    const t3_18tr =
      t2_thuNhapChiuThue <= 10000000
        ? 0
        : t2_thuNhapChiuThue >= 18000000
        ? 1200000
        : Math.floor((t2_thuNhapChiuThue - 10000000) * 0.15);
    const t3_32tr =
      t2_thuNhapChiuThue <= 18000000
        ? 0
        : t2_thuNhapChiuThue >= 32000000
        ? 2800000
        : Math.floor((t2_thuNhapChiuThue - 18000000) * 0.2);
    const t3_52tr =
      t2_thuNhapChiuThue <= 32000000
        ? 0
        : t2_thuNhapChiuThue >= 52000000
        ? 1200000
        : Math.floor((t2_thuNhapChiuThue - 32000000) * 0.25);
    const t3_80tr =
      t2_thuNhapChiuThue <= 52000000
        ? 0
        : t2_thuNhapChiuThue >= 80000000
        ? 8400000
        : Math.floor((t2_thuNhapChiuThue - 52000000) * 0.3);
    const t3_over80tr =
      t2_thuNhapChiuThue <= 80000000
        ? 0
        : Math.floor((t2_thuNhapChiuThue - 80000000) * 0.35);

    const t2_thueTNCN = -(
      t3_5tr +
      t3_10tr +
      t3_18tr +
      t3_32tr +
      t3_52tr +
      t3_80tr +
      t3_over80tr
    );
    let t2_luongNet = t2_thuNhapTruocThue + t2_thueTNCN;
    setData({
      luongGross: formatMoney(t2_luongGross),
      thueTNCN: formatMoney(t2_thueTNCN),
      baoHiem:
        '-' +
        formatMoney(t2_baoHiemYTe + t2_baoHiemThatNghiep + t2_baoHiemXaHoi),
      luongNet: formatMoney(t2_luongNet),
    });
    setData2({
      luongGross: formatMoney(t2_luongGross),
      baoHiemXaHoi: formatMoney(t2_baoHiemXaHoi),
      baoHiemYTe: formatMoney(t2_baoHiemYTe),
      baoHiemThatNghiep: formatMoney(t2_baoHiemThatNghiep),
      thuNhapTruocThue: formatMoney(t2_thuNhapTruocThue),
      giamTruBanThan: formatMoney(t2_giamTruBanThan),
      giamTruNguoiPhuThuoc: formatMoney(t2_giamTruNguoiPhuThuoc),
      thuNhapChiuThue: formatMoney(t2_thuNhapChiuThue),
      thueTNCN: formatMoney(t2_thueTNCN),
      luongNet: formatMoney(t2_luongNet),
    });
    setData3([
      {
        mucChiuThue: 'Đến 5 triệu VNĐ',
        thueSuat: '5%',
        tienNop: formatMoney(t3_5tr),
      },
      {
        mucChiuThue: 'Trên 5 -> 10 triệu VNĐ',
        thueSuat: '10%',
        tienNop: formatMoney(t3_10tr),
      },
      {
        mucChiuThue: 'Trên 10 -> 18 triệu VNĐ',
        thueSuat: '15%',
        tienNop: formatMoney(t3_18tr),
      },
      {
        mucChiuThue: 'Trên 18 -> 32 triệu VNĐ',
        thueSuat: '20%',
        tienNop: formatMoney(t3_32tr),
      },
      {
        mucChiuThue: 'Trên 32 -> 52 triệu VNĐ',
        thueSuat: '25%',
        tienNop: formatMoney(t3_52tr),
      },
      {
        mucChiuThue: 'Trên 52 -> 80 triệu VNĐ',
        thueSuat: '30%',
        tienNop: formatMoney(t3_80tr),
      },
      {
        mucChiuThue: 'Trên 80 triệu VNĐ',
        thueSuat: '35%',
        tienNop: formatMoney(t3_over80tr),
      },
    ]);
  }
  function convertNetToGross(revenue) {
    const t2_luongNet = parseInt(revenue);
    const t2_giamTruBanThan = -11000000;
    const t2_giamTruNguoiPhuThuoc =
      people.length > 0 ? -parseInt(people) * 4400000 : 0;
    const tmpThue = t2_luongNet + t2_giamTruBanThan + t2_giamTruNguoiPhuThuoc;
    const t2_thuNhapChiuThue =
      tmpThue < 0
        ? 0
        : tmpThue <= 4750000
        ? Math.floor(tmpThue / 0.95)
        : tmpThue <= 9250000
        ? Math.floor((tmpThue - 250000) / 0.9)
        : tmpThue <= 16050000
        ? Math.floor((tmpThue - 750000) / 0.85)
        : tmpThue <= 27250000
        ? Math.floor((tmpThue - 3250000) / 0.8)
        : tmpThue <= 42250000
        ? Math.floor((tmpThue - 3250000) / 0.75)
        : tmpThue <= 61850000
        ? Math.floor((tmpThue - 5850000) / 0.7)
        : Math.floor((tmpThue - 9850000) / 0.65);
    const t3_5tr =
      t2_thuNhapChiuThue >= 5000000
        ? 250000
        : Math.floor(t2_thuNhapChiuThue * 0.05);
    const t3_10tr =
      t2_thuNhapChiuThue <= 5000000
        ? 0
        : t2_thuNhapChiuThue >= 10000000
        ? 500000
        : Math.floor((t2_thuNhapChiuThue - 5000000) * 0.1);
    const t3_18tr =
      t2_thuNhapChiuThue <= 10000000
        ? 0
        : t2_thuNhapChiuThue >= 18000000
        ? 1200000
        : Math.floor((t2_thuNhapChiuThue - 10000000) * 0.15);
    const t3_32tr =
      t2_thuNhapChiuThue <= 18000000
        ? 0
        : t2_thuNhapChiuThue >= 32000000
        ? 2800000
        : Math.floor((t2_thuNhapChiuThue - 18000000) * 0.2);
    const t3_52tr =
      t2_thuNhapChiuThue <= 32000000
        ? 0
        : t2_thuNhapChiuThue >= 52000000
        ? 1200000
        : Math.floor((t2_thuNhapChiuThue - 32000000) * 0.25);
    const t3_80tr =
      t2_thuNhapChiuThue <= 52000000
        ? 0
        : t2_thuNhapChiuThue >= 80000000
        ? 8400000
        : Math.floor((t2_thuNhapChiuThue - 52000000) * 0.3);
    const t3_over80tr =
      t2_thuNhapChiuThue <= 80000000
        ? 0
        : Math.floor((t2_thuNhapChiuThue - 80000000) * 0.35);

    const t2_thueTNCN = -(
      t3_5tr +
      t3_10tr +
      t3_18tr +
      t3_32tr +
      t3_52tr +
      t3_80tr +
      t3_over80tr
    );

    const t2_thuNhapTruocThue =
      t2_thuNhapChiuThue - t2_giamTruBanThan - t2_giamTruNguoiPhuThuoc;

    let t2_luongGross = Math.floor(t2_thuNhapTruocThue / 0.895);
    const t2_baoHiemXaHoi = -Math.min(
      Math.floor(t2_luongGross * 0.08),
      2384000,
    );
    const t2_baoHiemYTe = -Math.min(Math.floor(t2_luongGross * 0.015), 447000);
    const t2_baoHiemThatNghiep = -Math.min(
      Math.floor(t2_luongGross * 0.01),
      884000,
    );
    t2_luongGross =
      t2_thuNhapTruocThue -
      t2_baoHiemXaHoi -
      t2_baoHiemYTe -
      t2_baoHiemThatNghiep;
    setData({
      luongGross: formatMoney(t2_luongGross),
      thueTNCN: formatMoney(t2_thueTNCN),
      baoHiem:
        '-' +
        formatMoney(t2_baoHiemYTe + t2_baoHiemThatNghiep + t2_baoHiemXaHoi),
      luongNet: formatMoney(t2_luongNet),
    });
    setData2({
      luongGross: formatMoney(t2_luongGross),
      baoHiemXaHoi: formatMoney(t2_baoHiemXaHoi),
      baoHiemYTe: formatMoney(t2_baoHiemYTe),
      baoHiemThatNghiep: formatMoney(t2_baoHiemThatNghiep),
      thuNhapTruocThue: formatMoney(t2_thuNhapTruocThue),
      giamTruBanThan: formatMoney(t2_giamTruBanThan),
      giamTruNguoiPhuThuoc: formatMoney(t2_giamTruNguoiPhuThuoc),
      thuNhapChiuThue: formatMoney(t2_thuNhapChiuThue),
      thueTNCN: formatMoney(t2_thueTNCN),
      luongNet: formatMoney(t2_luongNet),
    });
    setData3([
      {
        mucChiuThue: 'Đến 5 triệu VNĐ',
        thueSuat: '5%',
        tienNop: formatMoney(t3_5tr),
      },
      {
        mucChiuThue: 'Trên 5 -> 10 triệu VNĐ',
        thueSuat: '10%',
        tienNop: formatMoney(t3_10tr),
      },
      {
        mucChiuThue: 'Trên 10 -> 18 triệu VNĐ',
        thueSuat: '15%',
        tienNop: formatMoney(t3_18tr),
      },
      {
        mucChiuThue: 'Trên 18 -> 32 triệu VNĐ',
        thueSuat: '20%',
        tienNop: formatMoney(t3_32tr),
      },
      {
        mucChiuThue: 'Trên 32 -> 52 triệu VNĐ',
        thueSuat: '25%',
        tienNop: formatMoney(t3_52tr),
      },
      {
        mucChiuThue: 'Trên 52 -> 80 triệu VNĐ',
        thueSuat: '30%',
        tienNop: formatMoney(t3_80tr),
      },
      {
        mucChiuThue: 'Trên 80 triệu VNĐ',
        thueSuat: '35%',
        tienNop: formatMoney(t3_over80tr),
      },
    ]);
  }
  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            Công cụ tính lương Gross sang Net / Net sang Gross chuẩn 2021
          </Text>
          <Text style={styles.description}>
            Áp dụng mức giảm trừ gia cảnh mới nhất 11 triệu đồng/tháng (132
            triệu đồng/năm) với nguời nộp thuế và 4,4 triệu đồng/tháng với mỗi
            người phụ thuộc (Theo Nghị quyết số 954/2020/UBTVQH14) Áp dụng mức
            lương tối thiểu vùng mới nhất có hiệu lực từ ngày 1/1/2020 (Theo
            điều 3, Nghị định 90/2019/NĐ-CP)
          </Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Thu nhập (VNĐ)</Text>
          <TextInput
            style={styles.inputText}
            value={revenue}
            onChangeText={text => {
              console.log(text);
              setRevenue(revenueOld => {
                if (text[0] === '0') {
                  return revenueOld;
                }
                if (
                  text === '' ||
                  (text[text.length - 1] >= '0' && text[text.length - 1] <= '9')
                ) {
                  return text;
                }
                return revenueOld;
              });
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Đóng bảo hiểm</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              justifyContent: 'space-between',
            }}>
            <CheckBox
              isChecked={insurrance}
              onClick={() => {
                setInsurrance(true);
              }}
              rightTextView={<Text style={{marginLeft: 10}}>Click Here</Text>}
            />
            <CheckBox
              isChecked={!insurrance}
              onClick={() => {
                setInsurrance(false);
              }}
              rightTextView={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Text>Khác (VNĐ)</Text>
                  <TextInput
                    editable={!insurrance}
                    style={[styles.inputText, {margin: 0, paddingVertical: 0}]}
                    value={formatMoney(insuranceMoney)}
                    onChangeText={text => {
                      setInsuranceMoney(revenueOld => {
                        if (text[0] === '0') {
                          return revenueOld;
                        }
                        if (
                          text === '' ||
                          (text[text.length - 1] >= '0' &&
                            text[text.length - 1] <= '9')
                        ) {
                          return text;
                        }
                        return revenueOld;
                      });
                    }}
                  />
                </View>
              }
            />
          </View>
        </View>
        <View>
          <Text style={styles.label}>Vùng</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <CheckBox
              style={[styles.checkBox, {marginLeft: 0}]}
              isChecked={area === 1}
              onClick={() => {
                setArea(1);
              }}
              rightTextView={<Text style={styles.textCheckBox}>I</Text>}
            />
            <CheckBox
              style={styles.checkBox}
              isChecked={area === 2}
              onClick={() => {
                setArea(2);
              }}
              rightTextView={<Text style={styles.textCheckBox}>II</Text>}
            />
            <CheckBox
              style={styles.checkBox}
              isChecked={area === 3}
              onClick={() => {
                setArea(3);
              }}
              rightTextView={<Text style={styles.textCheckBox}>III</Text>}
            />
            <CheckBox
              style={styles.checkBox}
              isChecked={area === 4}
              onClick={() => {
                setArea(4);
              }}
              rightTextView={<Text style={styles.textCheckBox}>IV</Text>}
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Số người phụ thuộc</Text>
          <TextInput
            style={styles.inputText}
            value={people}
            onChangeText={text => {
              console.log(text);
              setPeople(revenueOld => {
                if (text[0] === '0') {
                  return revenueOld;
                }
                if (
                  text === '' ||
                  (text[text.length - 1] >= '0' && text[text.length - 1] <= '9')
                ) {
                  return text;
                }
                return revenueOld;
              });
            }}
          />
        </View>
        <View style={styles.groupBtn}>
          <TouchableOpacity
            onPress={() => {
              convertGrossToNet(revenue);
            }}
            activeOpacity={0.7}
            style={[styles.btn, {backgroundColor: '#5DADE2'}]}>
            <Text style={[styles.btnText]}>Gross -> Net</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              convertNetToGross(revenue);
            }}
            activeOpacity={0.7}
            style={styles.btn}>
            <Text style={styles.btnText}>Net -> Gross</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 20}}>
          <Table direction="row" data={[data]} column={column} />
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={styles.titleTable}>Diễn giải chi tiết (VNĐ)</Text>
          <Table direction="column" data={[data2]} column={column2} />
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={styles.titleTable}>
            (*) Chi tiết thuế thu nhập cá nhân (VNĐ)
          </Text>
          <Table direction="row" data={data3} column={column3} />
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={styles.titleTable}>
            Người sử dụng lao động trả (VNĐ)
          </Text>
          <Table direction="column" data={[data4]} column={column4} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  description: {
    fontSize: 13,
  },
  field: {
    marginVertical: 10,
  },
  label: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
  },
  inputText: {
    fontSize: 15,
    paddingVertical: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    minWidth: 126,
  },
  groupBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    minWidth: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  titleTable: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkBox: {
    margin: 10,
  },
  textCheckBox: {
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
});
export default PayRoll;
