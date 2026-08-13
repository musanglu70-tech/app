import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px', lineHeight: 1.7, color: '#1f2937', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>개인정보처리방침</h1>
      <p style={{ color: '#6b7280', marginBottom: 32 }}>시행일자: 2026년 7월 2일</p>

      <p style={{ marginBottom: 24 }}>
        CSO(주)우리메디텍(이하 "회사")은 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수하고 있습니다.
        회사는 본 개인정보처리방침을 통해 이용자가 제공하는 개인정보가 어떠한 목적과 방식으로 이용되고 있으며, 개인정보 보호를
        위해 어떠한 조치가 취해지고 있는지 알려드립니다.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>1. 수집하는 개인정보 항목</h2>
      <p style={{ marginBottom: 12 }}>
        회사는 수수료 상담, 파트너십 문의, 정산 요율 상담 등 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.
      </p>
      <ul style={{ marginBottom: 24, paddingLeft: 20 }}>
        <li>필수항목: 담당자명, 연락처(휴대전화번호)</li>
        <li>선택항목: 소속 회사명(사업자명), 월 매출액 규모, 지역, 문의 내용</li>
        <li>서비스 이용 과정에서 자동으로 생성되는 정보: 접속 로그, 서비스 이용 기록</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>2. 개인정보의 수집 및 이용 목적</h2>
      <ul style={{ marginBottom: 24, paddingLeft: 20 }}>
        <li>파트너(MR) 수수료 정산 요율 상담 및 안내</li>
        <li>파트너십 문의 및 제휴 신청에 대한 답변, 공지사항 전달</li>
        <li>서비스 개선을 위한 통계 분석</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>3. 개인정보의 보유 및 이용 기간</h2>
      <p style={{ marginBottom: 24 }}>
        회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다만, 관계 법령의
        규정에 의하여 보존할 필요가 있는 경우 회사는 관계 법령에서 정한 일정한 기간 동안 정보를 보관합니다.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>4. 개인정보의 제3자 제공</h2>
      <p style={{ marginBottom: 24 }}>
        회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 이용자가 사전에 동의한 경우이거나 법령의 규정에
        의거한 경우에는 예외로 합니다.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>5. 이용자의 권리와 행사 방법</h2>
      <p style={{ marginBottom: 24 }}>
        이용자는 언제든지 등록되어 있는 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다. 권리 행사는
        앱 내 "파트너십 문의" 메뉴 또는 아래 개인정보 보호책임자를 통해 요청하실 수 있으며, 회사는 이에 대해 지체 없이
        조치하겠습니다.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>6. 개인정보의 안전성 확보 조치</h2>
      <p style={{ marginBottom: 24 }}>
        회사는 개인정보의 안전성 확보를 위해 접근권한 관리, 접속기록 보관, 개인정보 암호화 등 기술적·관리적 조치를 취하고
        있습니다.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>7. 개인정보 보호책임자</h2>
      <p style={{ marginBottom: 24 }}>
        회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만 처리 및 피해 구제 등을 위하여
        개인정보 보호책임자를 지정하고 있습니다. 개인정보 관련 문의사항은 앱 내 "파트너십 문의" 또는 "공동체 FAQ" 메뉴를 통해
        접수해 주시기 바라며, 접수된 문의는 개인정보 보호책임자에게 전달되어 처리됩니다.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>8. 개인정보처리방침의 변경</h2>
      <p style={{ marginBottom: 24 }}>
        이 개인정보처리방침은 법령, 정책 또는 보안 기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 시에는 변경사항의 시행
        7일 전부터 앱 내 공지사항을 통하여 고지할 것입니다.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
