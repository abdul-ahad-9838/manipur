"use client";

export default function PdfCompareModal({ isOpen, onClose, pdfList = [] }) {
    // Viewer options chhupane ke liye '#toolbar=0&navpanes=0' add kiya gaya hai
    const pdf1 = pdfList[0]?.fileUrl
        ? `${pdfList[0].fileUrl}#toolbar=0&navpanes=0&scrollbar=0`
        : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf#toolbar=0&navpanes=0";

    const pdf2 = pdfList[1]?.fileUrl
        ? `${pdfList[1].fileUrl}#toolbar=0&navpanes=0&scrollbar=0`
        : "https://www.africau.edu/images/default/sample.pdf#toolbar=0&navpanes=0";

    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: "20px" }}>Important Documents</h2>
                        <span style={{ fontSize: "14px", color: "#666" }}>Please review both documents</span>
                    </div>
                    <button
                        onClick={onClose}
                        style={styles.closeButton}
                        aria-label="Close PDF popup"
                    >
                        &times;
                    </button>
                </div>

                <div style={styles.pdfContainer}>
                    <div style={styles.pdfPanel}>
                        <div style={styles.iframeWrapper}>
                            <iframe
                                src={pdf1}
                                title="PDF 1 Preview"
                                style={styles.pdf}
                            />
                        </div>
                    </div>

                    <div style={styles.pdfPanel}>
                        <div style={styles.iframeWrapper}>
                            <iframe
                                src={pdf2}
                                title="PDF 2 Preview"
                                style={styles.pdf}
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.footer}>
                    Both documents are displayed within the same popup.
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
    },
    modal: {
        background: "#fff",
        width: "100%",
        maxWidth: "1300px",
        height: "95vh",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 24px",
        borderBottom: "1px solid #e5e7eb",
    },
    closeButton: {
        background: "transparent",
        border: "none",
        fontSize: "28px",
        cursor: "pointer",
        lineHeight: 1,
        color: "#6b7280",
    },
    pdfContainer: {
        display: "flex",
        flex: 1,
        minHeight: 0,
        gap: "20px",
        padding: "0px",
    },
    pdfPanel: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: "12px",
        padding: "12px",
    },
    panelTitle: {
        fontSize: "16px",
        fontWeight: "600",
        margin: "0 0 10px 0",
        color: "#374151",
    },
    iframeWrapper: {
        position: "relative",
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "8px",
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
        color: "#6b7280",
        borderTop: "1px solid #e5e7eb",
        background: "#fff",
    },
};