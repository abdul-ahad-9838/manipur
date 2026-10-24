"use client";

export default function PdfCompareModal({ isOpen, onClose, pdfList = [] }) {
    // Viewer options ke sath URL setup
    const pdf1 = pdfList[0]?.fileUrl
        ? `${pdfList[0].fileUrl}#toolbar=0&navpanes=0&scrollbar=0`
        : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf#toolbar=0&navpanes=0";

    const pdf2 = pdfList[1]?.fileUrl
        ? `${pdfList[1].fileUrl}#toolbar=0&navpanes=0&scrollbar=0`
        : "https://www.africau.edu/images/default/sample.pdf#toolbar=0&navpanes=0";


    if (!isOpen) return null;

    return (
        <>
            {/* Hover effects ke liye chhota CSS block */}
            <style>{`
        .pdf-close-btn:hover {
          background: #121212 !important;
          color: #dc2626 !important;
        }
        .pdf-panel-1:hover {
          border-color: #2563eb !important;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
        }
        .pdf-panel-2:hover {
          border-color: #7c3aed !important;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.08);
        }
      `}</style>

            <div style={styles.overlay} onClick={onClose}>
                <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div style={styles.header}>
                        <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center !important", gap: "12px" }}>
                            <div style={styles.headerIcon}>📄</div>
                            <div>
                                <h2 style={styles.headerTitle}>Important Notice</h2>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            style={styles.closeButton}
                            className="pdf-close-btn"
                            aria-label="Close PDF popup"
                        >
                            &times;
                        </button>
                    </div>

                    {/* PDF Panels Container */}
                    <div style={styles.pdfContainer}>
                        {/* Panel 1 */}
                        <div style={styles.pdfPanel} className="pdf-panel-1">
                            <div style={styles.iframeWrapper}>
                                <iframe src={pdf1} title="PDF 1 Preview" style={styles.pdf} />
                            </div>
                        </div>

                        {/* Panel 2 */}
                        <div style={styles.pdfPanel} className="pdf-panel-2">
                            <div style={styles.iframeWrapper}>
                                <iframe src={pdf2} title="PDF 2 Preview" style={styles.pdf} />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={styles.footer}>
                        Both documents are displayed securely within the same popup.
                    </div>
                </div>
            </div >
        </>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
    },
    modal: {
        background: "#ffffff",
        width: "100%",
        maxWidth: "1400px",
        height: "92vh",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        border: "1px solid #e5e7eb",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        background: "#8b0000",
        borderBottom: "1px solid #e5e7eb",
    },
    headerIcon: {
        width: "38px",
        height: "38px",
        borderRadius: "8px",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
    },
    headerTitle: {
        margin: 0,
        fontSize: "18px",
        fontWeight: "600",
        color: "#fff",
    },
    headerSubtitle: {
        fontSize: "13px",
        color: "#f1f1f1",
    },
    closeButton: {
        background: "#000",
        border: "none",
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        fontSize: "20px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        transition: "background 0.2s ease, color 0.2s ease",
    },
    pdfContainer: {
        display: "flex",
        flex: 1,
        minHeight: 0,
        gap: "8px",
        padding: "16px",
        background: "#f9fafb",
    },
    pdfPanel: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        borderRadius: "10px",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    },
    panelHeader: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
    },
    badge: {
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "600",
    },
    panelTitle: {
        fontSize: "14px",
        fontWeight: "600",
        margin: 0,
        color: "#1f2937",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    iframeWrapper: {
        position: "relative",
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "6px",
        border: "1px solid #e5e7eb",
        background: "#ffffff",
    },
    pdf: {
        width: "100%",
        height: "100%",
        border: "none",
    },
    footer: {
        textAlign: "center",
        padding: "12px",
        fontSize: "13px",
        color: "#4b5563",
        borderTop: "1px solid #e5e7eb",
        background: "#ffffff",
    },
};